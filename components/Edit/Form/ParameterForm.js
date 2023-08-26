import styles from "./ParameterForm.module.css";
import React, { useState, useReducer } from "react";
import RadioButton from "../RadioButton/RadioButton";
import DropdownComponent from "../DropDown/DropDown";
import About from "../About/About";
import Submit from "../Submit/Submit";
import { getDataFromEmails } from "@/utils/email";

const options = {
  campaignGoal: [
    { label: "Convince to buy product", value: "Convince to buy product" },
    { label: "Recover churned customers", value: "Recover churned customers" },
    { label: "Teach a new concept", value: "Teach a new concept" },
    { label: "Onboard users", value: "Onboard users" },
    { label: "Share product updates", value: "Share product updates" },
    { label: "Increase brand awareness", value: "Increase brand awareness" },
    { label: "Grow email subscribers", value: "Grow email subscribers" },
    {
      label: "Promote an event or webinar",
      value: "Promote an event or webinar",
    },
    {
      label: "Increase social media engagement",
      value: "Increase social media engagement",
    },
  ],
  brandTone: [
    { label: "Formal", value: "Formal" },
    { label: "Informal", value: "Informal" },
    { label: "Humorous", value: "Humorous" },
    { label: "Serious", value: "Serious" },
    { label: "Inspirational", value: "Inspirational" },
    { label: "Friendly", value: "Friendly" },
  ],
  industry: [
    { label: "Marketing Agency", value: "Marketing Agency" },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Software", value: "Software" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "E-commerce", value: "E-commerce" },
    { label: "Education", value: "Education" },
    { label: "Finance and Banking", value: "Finance and Banking" },
    { label: "Real Estate", value: "Real Estate" },
    { label: "Food and Beverage", value: "Food and Beverage" },
  ],
};

const RadioForm = ({
  campaign,
  setCampaign,
  setIsSaving,
  _id,
  updateHandler,
  isSaving,
}) => {
  const handleOptionChange = (field, value) => {
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      preferences: {
        ...prevCampaign.preferences,
        [field]: value,
      },
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const [useWebsite, setUseWebsite] = useState(false);

  // const getWebsiteData = async () => {
  //   try {
  //     if (useWebsite) {
  //       const res = await fetch(
  //         process.env.NEXT_PUBLIC_API_URL +
  //           "/api/personalize/website?url=" +
  //           website
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //       return {
  //         website,
  //         websiteData,
  //       };
  //     }
  //   } catch (error) {
  //     alert(
  //       "There was an error scraping the website (continuing without personalizing)"
  //     );
  //     return null;
  //   }
  // };

  // const createHelper = async (campaign) => {
  //   try {
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_API_URL + "/api/ai/generate",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(campaign),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     return {
  //       data: data.message,
  //     };
  //   } catch (error) {
  //     alert("There was an error generating the campaign: " + error.message);
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const generateCampaign = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   await setCampaign(async (prev) => {
  //     // handleOptionChange("generatedSamples", null);
  //     const websiteDataObject = await getWebsiteData();
  //     const generateData = await createHelper(prev);

  //     return {
  //       ...prev,
  //       preferences: {
  //         ...prev.preferences,
  //         scrapped_website: websiteDataObject ? websiteDataObject.website : null,
  //         scrapped_website_data: websiteDataObject ? websiteDataObject.websiteData : null,
  //         generatedSamples: generateData ? generateData.data : null,
  //       },
  //     };
  //   });

  //   setIsSaving(true);
  //   await updateHandler(_id, campaign);
  //   setIsSaving(false);

  // };

  const generateCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear out old samples before fetching new ones
    handleOptionChange("generatedSamples", null);

    try {
      if (useWebsite) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/personalize/website?url=" +
            website
        );
        const data = await res.json();
        console.log(data);

        handleOptionChange("scrapped_website", website);
        handleOptionChange("scrapped_website_data", data.scrapped_website_data);
      }
    } catch (error) {
      alert(
        "There was an error scraping the website (continuing without personalizing)"
      );
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: campaign._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      await handleOptionChange("generatedSamples", data);
      setIsLoading(false);
      // console.log(data);

      const emailData = await getDataFromEmails(campaign._id, data);
      console.log("Email Data: " + emailData);
      await handleOptionChange("emailData", emailData);
      

      setTimeout(async () => {
        setIsSaving(true);
        await updateHandler(_id, campaign.name, campaign.preferences);
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      alert("There was an error generating the campaign: " + error.message);
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isSaving && <div className={styles.feedback}>Saving</div>}

      {isLoading && <div className={styles.feedback}>Generating</div>}

      {campaign.preferences && (
        <div className={styles.dropdown_options}>
          <DropdownComponent
            title="Campaign Goal"
            options={options.campaignGoal}
            selectedOption={campaign.preferences.campaignGoal}
            handleOptionChange={(value) =>
              handleOptionChange("campaignGoal", value)
            }
          />
          <DropdownComponent
            title="Brand Tone"
            options={options.brandTone}
            selectedOption={campaign.preferences.brandTone}
            handleOptionChange={(value) =>
              handleOptionChange("brandTone", value)
            }
          />

          <DropdownComponent
            title="Industry"
            options={options.industry}
            handleOptionChange={(value) =>
              handleOptionChange("industry", value)
            }
            selectedOption={campaign.preferences.industry}
          />
        </div>
      )}

      {campaign.preferences && (
        <About
          handleOptionChange={(value) =>
            handleOptionChange("description", value)
          }
          saved={campaign.preferences.description}
        />
      )}

      {campaign.preferences && (
        <Submit
          isGenerated={
            true
              ? campaign.preferences.generatedSamples &&
                campaign.preferences.generatedSamples.length > 0
              : false
          }
          website={website}
          setWebsite={setWebsite}
          setUseWebsite={setUseWebsite}
          generateCampaign={generateCampaign}
          isSaving={isSaving}
          isLoading={isLoading}
          updateHandler={async () => {
            setIsSaving(true);
            await updateHandler(_id, campaign.name, campaign.preferences);
            setIsSaving(false);
          }}
        />
      )}
    </div>
  );
};

export default RadioForm;
