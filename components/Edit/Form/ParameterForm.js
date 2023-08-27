import styles from "./ParameterForm.module.css";
import React, { useState, useReducer } from "react";
import RadioButton from "../RadioButton/RadioButton";
import DropdownComponent from "../DropDown/DropDown";
import About from "../About/About";
import Submit from "../Submit/Submit";
import { generateEmailData, fetchEmailsByCampaignId } from "@/utils/email";

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
    { label: "Drive website traffic", value: "Drive website traffic" },
    { label: "Boost post engagement", value: "Boost post engagement" },
    { label: "Encourage app installations", value: "Encourage app installations" },
    { label: "Generate leads", value: "Generate leads" },
    { label: "Promote content", value: "Promote content" },
    { label: "Strengthen community ties", value: "Strengthen community ties" },
    { label: "Improve customer service", value: "Improve customer service" },
  ],
  brandTone: [
    { label: "Formal", value: "Formal" },
    { label: "Informal", value: "Informal" },
    { label: "Humorous", value: "Humorous" },
    { label: "Serious", value: "Serious" },
    { label: "Inspirational", value: "Inspirational" },
    { label: "Friendly", value: "Friendly" },
    { label: "Professional", value: "Professional" },
    { label: "Casual", value: "Casual" },
    { label: "Playful", value: "Playful" },
    { label: "Passionate", value: "Passionate" },
    { label: "Technical", value: "Technical" },
    { label: "Empathetic", value: "Empathetic" },
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
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Media and Entertainment", value: "Media and Entertainment" },
    { label: "Non-profit", value: "Non-profit" },
    { label: "Travel and Hospitality", value: "Travel and Hospitality" },
    { label: "Automotive", value: "Automotive" },
    { label: "Energy", value: "Energy" },
    { label: "Fashion and Beauty", value: "Fashion and Beauty" },
    { label: "Telecommunications", value: "Telecommunications" },
    { label: "Public Services", value: "Public Services" },
  ],
};

const RadioForm = ({
  campaign,
  setCampaign,
  setIsSaving,
  setEmails,
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

  const generateCampaign = async (e) => {

    // save all the preferences first 
    console.log(campaign)
    await updateHandler(_id, campaign.name, campaign.preferences);
    
    e.preventDefault();
    setIsLoading(true);
    // do i need to store the scraped data? ... maybe in the future!
    let websiteText = null;
    try {
      if (useWebsite) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/personalize/website?url=" +
            website
        );
        const data = await res.json();
        websiteText = data.scrapped_website_data;
      }
    } catch (error) {
      alert(
        "There was an error scraping the website (continuing without personalizing)"
      );
    }

    const updatedBody = {
      _id: campaign._id,
    };

    if (websiteText) {
      updatedBody.websiteData = websiteText;
    }

    console.log(JSON.stringify(updatedBody));

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      // console.log(data);

      // post all the data,

      console.log("\n\n\n\n\n" + data + "\n\n\n\n\n");

      await generateEmailData(campaign._id, data);

      // get new data from campaign._id

      const emails = await fetchEmailsByCampaignId(campaign._id);

      setEmails(emails.data);
      setIsLoading(false);

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
            handleOptionChange={async (value) => {
              await handleOptionChange("campaignGoal", value);
              // await updateHandler(_id, campaign.name, campaign.preferences);
            }}
          />
          <DropdownComponent
            title="Brand Tone"
            options={options.brandTone}
            selectedOption={campaign.preferences.brandTone}
            handleOptionChange={async (value) => {
              await handleOptionChange("brandTone", value);
              // await updateHandler(_id, campaign.name, campaign.preferences);
            }}
          />

          <DropdownComponent
            title="Industry"
            options={options.industry}
            handleOptionChange={async (value) => {
              await handleOptionChange("industry", value);
              // await updateHandler(_id, campaign.name, campaign.preferences);
            }}
            selectedOption={campaign.preferences.industry}
          />
        </div>
      )}

      {campaign.preferences && (
        <About
          handleOptionChange={(value) => {
            handleOptionChange("description", value);
            // updateHandler(_id, campaign.name, campaign.preferences);
          }}
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
          website={
            campaign.preferences.website ? campaign.preferences.website : ""
          }
          useWebsite={
            campaign.preferences.useWebsite
              ? campaign.preferences.useWebsite
              : ""
          }
          setWebsite={setWebsite}
          setUseWebsite={setUseWebsite}
          generateCampaign={generateCampaign}
          isSaving={isSaving}
          isLoading={isLoading}
          handleOptionChange={handleOptionChange}
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
