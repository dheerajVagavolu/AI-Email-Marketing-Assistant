import RadioForm from "@/components/Edit/Form/ParameterForm";
import styles from "./Edit.module.css";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import GeneratedSamples from "@/components/Edit/GeneratedSamples/GeneratedSamples";
import Navbar from "@/components/UI/Navbar/Navbar";
import { updateCampaign } from "@/utils/campaigns";

const Edit = ({ campaignData, emailData }) => {
  const router = useRouter();

  const resultsRef = useRef(null);
  const [campaign, setCampaign] = useState(campaignData);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  const [emails, setEmails] = useState(emailData);

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
        <Navbar />
        <p
          style={{
            padding: "1rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#999",
          }}
        >
          <em>Select your preferences and generate custom Emails!</em>
        </p>
        <div className={styles.main}>
          {goingBack && <div className={styles.feedback}>Loading</div>}
          {isDeleting && <div className={styles.feedback}>Deleting</div>}
          <div className={styles.form}>
            <div className={styles.header}>
              {campaign && <h2>{campaign.name}</h2>}
              <p
                style={{
                  padding: "1rem 2rem",
                  textAlign: "center",
                  fontSize: "1rem",
                  color: "#999",
                }}
              >
                <em>
                  Introduce information about your business and the goal of the
                  campaign and we'll take care of the rest
                </em>
              </p>
            </div>
            {campaign && (
              <RadioForm
                scrollDown={scrollDown}
                campaign={campaign}
                setCampaign={setCampaign}
                setEmails={setEmails}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
                updateHandler={updateCampaign}
                _id={router.query._id}
              />
            )}
          </div>

          {emailData && campaign && campaign.preferences && (
            <GeneratedSamples
              generatedValues={campaign.preferences.generatedSamples}
              setGeneratedValues={setCampaign}
              campaignId={router.query._id}
              editSample={editSample}
              emails={emails}
              setEmails={setEmails}
              deleteSample={deleteSample}
              setIsDeleting={setIsDeleting}
              setIsSaving={setIsSaving}
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
  const campaignUrl =
    process.env.NEXT_PUBLIC_API_URL +
    `/api/campaign/getById?_id=${context.query._id}`;

  const emailDataUrl =
    process.env.NEXT_PUBLIC_API_URL +
    `/api/emailData/getByCampaignId?campaignId=${context.query._id}`;

  const [campaignResponse, emailDataResponse] = await Promise.all([
    fetch(campaignUrl),
    fetch(emailDataUrl),
  ]);

  const [campaignData, emailData] = await Promise.all([
    campaignResponse.json(),
    emailDataResponse.json(),
  ]);

  return {
    props: {
      campaignData: campaignData,
      emailData: emailData,
    },
  };
}

export default Edit;
