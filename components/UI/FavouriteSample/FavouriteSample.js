import { useEffect, useState } from "react";
import styles from "./FavouriteSample.module.css";
import Example from "@/components/Home/Example/Example";

const FavouriteSample = ({ deleteFavorite, _id, campaignId, email }) => {
  useEffect(() => {
    // fetch a single campaign
    // attach the email to it.
    // add delete logic based on the id
  }, []);

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/campaign/getOne?id=${campaignId}`
        );
        if (!response.ok) {
          setCampaign(null);
          console.log("Failed to fetch campaign");
        } else {
          const data = await response.json();
          setCampaign(data);
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setCampaign(null);
      }
    }
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  return (
    <>
      {!campaign && <div className={styles.main} style={{display:"none"}}>
        {campaign && <Example item={campaign} />}
        {campaign && <div className={styles.email}>{email}</div>}
      </div>}
      {campaign && <div className={styles.main}>
        {campaign && <Example item={campaign} />}
        {campaign && <div className={styles.email}>{email}</div>}
      </div>}
    </>
  );
};

export default FavouriteSample;
