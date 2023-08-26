import { useRouter } from "next/router";
import styles from "./index.module.css";
import Example from "@/components/Home/Example/Example";

import { useEffect, useState } from "react";
import Navbar from "@/components/UI/Navbar/Navbar";
import { fetchCampaigns, createCampaign } from "@/utils/campaigns";

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
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/campaign/deleteById",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id }),
        }
      );

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

  const router = useRouter();

  return (
    <div className={styles.main}>
      {isDeleting && <div className={styles.feedback}>Deleting...</div>}
      {isCreating && <div className={styles.feedback}>Creating...</div>}
      <Navbar
        pages={{
          Campaign: () => {
            router.push("/");
          },
          Favorites: () => {
            router.push("/favorites");
          },
        }}
      />
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
      {campaigns && (
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
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const dataJson = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/campaign/getAll"
  );
  const data = await dataJson.json();

  // console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export default Home;
