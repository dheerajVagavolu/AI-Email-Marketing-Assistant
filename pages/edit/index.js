import RadioForm from "@/components/Edit/Form/ParameterForm";
import styles from "./Edit.module.css";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import GeneratedSamples from "@/components/Edit/GeneratedSamples/GeneratedSamples";
import Navbar from "@/components/UI/Navbar/Navbar";
import { updateCampaign } from "@/utils/campaigns";

const Edit = ({ data }) => {
  const router = useRouter();

  const resultsRef = useRef(null);
  const [campaign, setCampaign] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [goingBack, setGoingBack] = useState(false);

  // console.log(JSON.stringify(campaign));

  const deleteSample = (indexToDelete) => {
    if (campaign && campaign.preferences.generatedSamples) {
      const updatedSamples = campaign.preferences.generatedSamples.filter(
        (_, index) => index !== indexToDelete
      );
      setCampaign((prevCampaign) => ({
        ...prevCampaign,
        preferences: {
          ...prevCampaign.preferences,
          generatedSamples: updatedSamples,
        },
      }));
    }
  };

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

  const editSample = (value, index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Navbar
          pages={{
            Campaign: () => {
              setGoingBack(true);
              router.push("/");
              setTimeout(() => {
                setGoingBack(false);
              }, 1000);
            },
            Favorites: () => {
              router.push("/favorites");
            },
          }}
        />
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
                setIsSaving={setIsSaving}
                updateHandler={updateCampaign}
                _id={router.query._id}
              />
            )}
          </div>

          {campaign &&
            campaign.preferences &&
            campaign.preferences.generatedSamples &&
            campaign.preferences.generatedSamples.length > 0 && (
              <GeneratedSamples
                generatedValues={campaign.preferences.generatedSamples}
                setGeneratedValues={setCampaign}
                campaignId={router.query._id}
                editSample={editSample}
                deleteSample={deleteSample}
                updateHandler={async () => {
                  setIsSaving(true);
                  try {
                    await updateCampaign(
                      router.query._id,
                      campaign.name,
                      campaign.preferences
                    );
                  } catch {
                    //
                  } finally {
                    setIsSaving(false);
                  }
                }}
              />
            )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/campaign/getById?_id=${context.query._id}`
  );
  const data = await response.json();

  // console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export default Edit;
