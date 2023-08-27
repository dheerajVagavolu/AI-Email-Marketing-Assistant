import styles from "./GeneratedSamples.module.css";

import { useState, useEffect } from "react";
import Sample from "./Sample";
import { updateEmailHandler } from "@/utils/email";
import { fetchEmailsByCampaignId } from "@/utils/email";

const GeneratedSamples = ({
  setIsDeleting,
  setGeneratedValues,
  setIsSaving,
  campaignId,
  emails,
  setEmails,
  resultsRef,

  updateHandler,
}) => {
  const updateEmail = async (_id, favorite = null, emailText = null) => {
    await updateEmailHandler(
      "PUT",
      (_id = _id),
      (emailText = emailText),
      (favorite = favorite)
    );
    // refetch and update emails:
    const data = await fetchEmailsByCampaignId(campaignId);

    setEmails(data.data);
  };

  const deleteEmail = async (_id) => {
    // deleted from the database
    const res = await updateEmailHandler("DELETE", (_id = _id));

    // refetch and update emails:
    const data = await fetchEmailsByCampaignId(campaignId);
    console.log("Data");
    console.log(data.data);

    setEmails(data.data);
  };

  const favoriteEmail = (_id) => {
    updateEmail(_id, true, null);
  };

  const unfavoriteEmail = (_id) => {
    updateEmail(_id, false, null);
  };

  const saveEditedEmail = async (_id, emailBody) => {
    await updateEmail(_id, null, emailBody);
  };

  return (
    <>
      {emails && emails.length !== 0 && (
        <div className={styles.results} ref={resultsRef}>
          <div className={styles.header}>
            <h1>Generated Emails</h1>
            <p
              style={{
                padding: "1rem 2rem",
                textAlign: "center",
                fontSize: "1rem",
                color: "#999",
              }}
            >
              <em>(Edit, Delete or Mark as Favorite - Make sure to save)</em>
            </p>
          </div>

          <ul className={styles.items}>
            {emails.map((item, num) => (
              <Sample
                setIsSaving={setIsSaving}
                item={item}
                num={num}
                key={item._id}
                campaignId={campaignId}
                favoriteEmail={() => favoriteEmail(item._id)}
                unfavoriteEmail={() => unfavoriteEmail(item._id)}
                saveEditedEmail={saveEditedEmail}
                setGeneratedValues={setGeneratedValues}
                updateHandler={updateHandler}
                deleteSample={async () => {
                  setIsDeleting(true);
                  await deleteEmail(item._id);
                  setIsDeleting(false);
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeneratedSamples;
