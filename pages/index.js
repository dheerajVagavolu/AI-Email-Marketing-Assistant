import { useRouter } from "next/router";
import styles from "./index.module.css";
import Example from "@/components/campaign/Example";

import { useEffect, useState } from "react";

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
  const [campaignName, setCampaignName] = useState("");
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <ul>
          <li>Campaigns</li>
          <li>Users</li>
        </ul>
      </div>
      <div className={styles.campaigns}>
        <div className={styles.existing}>
          {data.map((item) => (
            <Example item={item}/>
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
                createCampaign(campaignName);
                router.push('/');
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
