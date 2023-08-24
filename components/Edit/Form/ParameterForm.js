import styles from './ParameterForm.module.css'
import React, { useState, useReducer } from "react";
import RadioButton from "../RadioButton/RadioButton";
import DropdownComponent from "../DropDown/DropDown";
import About from "../About/About";
import Submit from "../Submit/Submit";

const options = {
  campaignGoal: [
    { label: "Convince to buy product", value: "Convince to buy product" },
    { label: "Recover churned customers", value: "Recover churned customers" },
    { label: "Teach a new concept", value: "Teach a new concept" },
    { label: "Onboard users", value: "Onboard users" },
    { label: "Share product updates", value: "Share product updates" },
    { label: "Increase brand awareness", value: "Increase brand awareness" },
    { label: "Grow email subscribers", value: "Grow email subscribers" },
    { label: "Promote an event or webinar", value: "Promote an event or webinar" },
    { label: "Increase social media engagement", value: "Increase social media engagement" },
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
  scrollDown,
  campaign,
  setCampaign,
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
    e.preventDefault();
    setIsLoading(true);

    // Clear out old samples before fetching new ones
    handleOptionChange("generatedSamples", null);

    try {
      // alert("useWebsite" + useWebsite);
      // alert("website" + website);
      if (useWebsite) {
        const res = await fetch("/api/personalize/website?url=" + website);
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
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("\n\n\n\n\n\n");
      // console.log(data.message)
      // console.log("\n\n\n\n\n\n");
      handleOptionChange("generatedSamples", data.message);
      console.log(data.message);

      setTimeout(() => {
        scrollDown();
      }, 1000);
    } catch (error) {
      alert("There was an error generating the campaign: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>

    {isSaving && <div className={styles.feedback}>Saving</div>}
    {isLoading && <div className={styles.feedback}>Generating</div>}

      <RadioButton
        title="Campaign Goal"
        options={options.campaignGoal}
        selectedOption={campaign.preferences.campaignGoal}
        handleOptionChange={(value) =>
          handleOptionChange("campaignGoal", value)
        }
      />
      <RadioButton
        title="Brand Tone"
        options={options.brandTone}
        selectedOption={campaign.preferences.brandTone}
        handleOptionChange={(value) => handleOptionChange("brandTone", value)}
      />
      <DropdownComponent
        title="Industry"
        options={options.industry}
        handleOptionChange={(value) => handleOptionChange("industry", value)}
        selectedOption={campaign.preferences.industry}
      />
      <About
        handleOptionChange={(value) => handleOptionChange("description", value)}
        saved={campaign.preferences.description}
      />
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
        updateHandler={updateHandler}
      />
    </div>
  );
};

export default RadioForm;
