import RadioForm from "@/components/Edit/Form/ParameterForm";
import styles from "./Edit.module.css";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import GeneratedSamples from "@/components/Edit/GeneratedSamples/GeneratedSamples";

const Edit = ({ isConnected }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const resultsRef = useRef(null);
  const [campaign, setCampaign] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  async function updateHandler(_id) {
    try {
      setIsSaving(true);
      const response = await fetch("/api/campaign/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          name: campaign.name,
          preferences: campaign.preferences,
          lastUsed: new Date().toDateString().toLocaleLowerCase("en-us"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  const router = useRouter();

  useEffect(() => {
    // Check if the ref is attached and if the values are populated

    async function fetchCampaign() {
      try {
        const response = await fetch(
          `/api/campaign/getOne?id=${router.query._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch campaign");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    }

    if (router.query._id) {
      fetchCampaign();
    }
  }, [router.query._id]);

  const scrollDown = () => {
    if (
      resultsRef.current &&
      campaign.preferences.generatedSamples &&
      campaign.preferences.generatedSamples.length > 0
    ) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [goingBack, setGoingBack] = useState(false);

  const editSample = (value, index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <navbar className={styles.home}>
        <button
          className={styles.home_button}
          onClick={() => {
            setGoingBack(true);
            router.push("/");
            setTimeout(() => {
              setGoingBack(false);
            }, 1000);
          }}
        >
          <h2> Home</h2>
        </button>
      </navbar>
      <div className={styles.main}>
      {goingBack && <div className={styles.feedback}>Loading</div>}
        <div className={styles.form}>
          <div className={styles.header}>
            {campaign && <h2>{campaign.name}</h2>}
            <p>
              Introduce information about your business and the goal of the
              campaign and we'll take care of the rest
            </p>
          </div>
          {campaign && (
            <RadioForm
              scrollDown={scrollDown}
              campaign={campaign}
              setCampaign={setCampaign}
              isSaving={isSaving}
              updateHandler={() => updateHandler(router.query._id)}
            />
          )}
        </div>

        {campaign &&
          campaign.preferences.generatedSamples &&
          campaign.preferences.generatedSamples.length > 0 && (
            <GeneratedSamples
              generatedValues={campaign.preferences.generatedSamples}
              setGeneratedValues={setCampaign}
              resultsRef={resultsRef}
              selectedItem={selectedItem}
              editSample={editSample}
            />
          )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      isConnected: false,
    },
  };
}

export default Edit;
