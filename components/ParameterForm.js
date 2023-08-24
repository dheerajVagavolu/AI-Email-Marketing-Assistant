import React, { useState, useReducer } from "react";
import RadioButton from "./RadioButton";
import DropdownComponent from "./DropDown";
import About from "./About";
import Submit from "./Submit";
import { useRouter } from "next/router";

const initialState = {
  campaignGoal: null,
  brandTone: null,
  industry: null,
  description: null,
};

const options = {
  campaignGoal: [
    { label: "Convince to buy product", value: "Convince to buy product" },
    {
      label: "Recover churned customers",
      value: "Recover churned customers",
    },
    { label: "Teach a new concept", value: "Teach a new concept" },
    { label: "Onboard users", value: "Onboard users" },
    { label: "Share product updates", value: "Share product updates" },
  ],
  brandTone: [
    { label: "Formal", value: "Formal" },
    { label: "Informal", value: "Informal" },
  ],
  industry: [
    { label: "Marketing Agency", value: "Marketing Agency" },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Software", value: "Software" },
  ],
};

const reducer = (state, action) => {
  // alert("Action Was Taken: " + action.type + " " + action.payload);
  switch (action.type) {
    case "SET_CAMPAIGN_GOAL":
      return { ...state, campaignGoal: action.payload };
    case "SET_BRAND_TONE":
      return { ...state, brandTone: action.payload };
    case "SET_INDUSTRY":
      return { ...state, industry: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

const RadioForm = ({ setGeneratedValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const generateCampaign = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setGeneratedValues(data.message);
    } catch (error) {
      alert("There was an error generating the campaign: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <RadioButton
        title="Campaign Goal"
        options={options.campaignGoal}
        dispatch={dispatch}
        actionType="SET_CAMPAIGN_GOAL"
        selectedOption={state.campaignGoal}
        // onChange={handleOptionChange("campaignGoal")}
      />
      <RadioButton
        title="Brand Tone"
        options={options.brandTone}
        dispatch={dispatch}
        actionType="SET_BRAND_TONE"
        selectedOption={state.brandTone}
        // onChange={handleOptionChange("brandTone")}
      />
      <DropdownComponent
        title="Industry"
        options={options.industry}
        dispatch={dispatch}
        actionType="SET_INDUSTRY"
        selectedOption={state.industry}
      />
      <About dispatch={dispatch} actionType="SET_DESCRIPTION" />
      <Submit generateCampaign={generateCampaign} isLoading={isLoading} />
    </div>
  );
};

export default RadioForm;
