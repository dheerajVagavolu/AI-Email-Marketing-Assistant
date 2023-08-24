import { useRouter } from "next/router";
import styles from "./index.module.css";
import Example from "@/components/Home/Example/Example";

import { useEffect, useState } from "react";

const fetchCampaigns = async () => {
  const dataJson = await fetch("http://localhost:3000/api/campaign/getAll");
  const data = await dataJson.json();

  console.log(data);

  return {
    data: data,
  };
};

const createCampaign = async (
  name,
  preferences = { date: new Date().toLocaleString("en-US") }
) => {
  try {
    const response = await fetch("/api/campaign/create", {
      // replace 'path_to_your_handler' with the correct path
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        preferences,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // "Successfully added campaign"
      return data;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("There was an error creating the campaign", error);
  }
};

const Home = ({ data }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [campaigns, setCampaigns] = useState(data);

  const [campaignName, setCampaignName] = useState("");

  const addCampaign = async (name) => {
    try {
      setIsCreating(true);
      const newCampaign = await createCampaign(name);
      if (newCampaign) {
        const refreshedCampaigns = await fetchCampaigns();
        setCampaigns(refreshedCampaigns.data);
      }
    } catch (error) {
      console.error(`Error Creating Campaign`, error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCampaign = async (_id) => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/campaign/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error(
          `Error deleting item: ${responseData.message || "Unknown error"}`
        );
        return;
      }

      console.log(`Successfully deleted item with _id: ${_id}`);

      // Remove the deleted campaign from the local state
      // setCampaigns(campaigns.filter((campaign) => campaign._id !== _id));
      const refreshedCampaigns = await fetchCampaigns();
      setCampaigns(refreshedCampaigns.data);
    } catch (error) {
      console.error(`Error deleting item with _id: ${_id}`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.main}>
      {isDeleting && <div className={styles.feedback}>Deleting...</div>}
      {isCreating && <div className={styles.feedback}>Creating...</div>}
      <div className={styles.navbar}>
        <ul>
          <li>Campaigns</li>
        </ul>
      </div>
      <div className={styles.campaigns}>
        <div className={styles.existing}>
          {campaigns.map((item) => (
            <Example
              item={item}
              key={item._id}
              onDelete={handleDeleteCampaign}
            />
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Campaign Name"
          />
          <button
            onClick={() => {
              if (campaignName.trim() !== "") {
                addCampaign(campaignName);
              } else {
                alert("Please enter a campaign name!");
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const dataJson = await fetch("http://localhost:3000/api/campaign/getAll");
  const data = await dataJson.json();

  console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export default Home;
