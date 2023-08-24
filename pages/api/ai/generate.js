// configure dotenv
require("dotenv").config();

// import modules from OpenAI library
import OpenAI from "openai";

const createPrompt = (campaign) => {
  let preferencesText = "";

  // Extract preferences, ignoring certain keys
  if (campaign.preferences && typeof campaign.preferences === "object") {
    for (let [key, value] of Object.entries(campaign.preferences)) {
      if (!["description", "website", "scrapped_website_data"].includes(key)) {
        preferencesText += `- ${key}: ${value}\n`;
      }
    }
  }

  let description = campaign.preferences?.description
    ? `The main focus is: ${campaign.preferences.description}.\n`
    : "";

  let toneText =
    campaign.preferences.website && campaign.preferences.scrapped_website_data
      ? `Ensure that the emails adopt a tone inspired by the website ${campaign.preferences.website}. For reference, the website contains: ${campaign.preferences.scrapped_website_data}.\n`
      : "";

  return `For the Marketing Campaign titled "${campaign.name}", generate 5 distinct emails. ${description}${toneText}Given the below preferences, each email should have a subject and a body (under 10 lines each). Strictly use the following structure for each email:
{subject}

{body}

Separate each email with '---'. Refrain from using numbers, bullets, or quotations in the content.

Preferences:
${preferencesText}`;
};

const createResponse = (message) => {
  return message
    .split("---")
    .map((email) => ({ body: email.trim() })) // Wrap in an object
    .filter((emailObj) => emailObj.body !== ""); // Remove objects with empty 'body' value
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    // const { campaignGoal, brandTone, industry } = req.body;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = createPrompt(req.body);

    console.log(prompt);

    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const res_ai = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(res_ai);

    console.log(res_ai.choices);

    // retrieve the completion text from response
    const completion = res_ai.choices[0].message.content;

    const response = createResponse(completion);

    return res.status(200).json({ message: response });
  } else {
    return res.status(405).end(); // Method Not Allowed if not a POST request.
  }
}
