// configure dotenv
require("dotenv").config();
import { MongoClient, ObjectId } from "mongodb";
// import modules from OpenAI library
import OpenAI from "openai";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

const createPrompt = (campaign, websiteData) => {
  let preferencesText = "";

  // Extract preferences, ignoring certain keys
  if (campaign.preferences && typeof campaign.preferences === "object") {
    for (let [key, value] of Object.entries(campaign.preferences)) {
      if (
        !["description", "website", "websiteData", "useWebsiteData"].includes(
          key
        )
      ) {
        preferencesText += `- ${key}: ${value}\n`;
      }
    }
  }

  let description = campaign.preferences?.description
    ? `The main focus is: ${campaign.preferences.description}.\n`
    : "";

  let toneText = websiteData
      ? `Ensure that the email adopt a tone personalized for the user based on their website which is shown between [START] and [END] tags: [START]${websiteData}[END].\n`
      : "";

  return `For the Marketing Campaign titled "${campaign.name}", generate 1 distinct email. ${description}${toneText}Given the below preferences, the email should have a subject and a body (under 10 lines). Strictly use the following structure for the email:
Subject: {subject}

Body: {body}

Refrain from using numbers, bullets, or quotations in the content.

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
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let client;

    try {
      client = await connectToDatabase();
      const db = client.db();

      const { _id, websiteData } = req.body;

      if (!_id) {
        return res
          .status(400)
          .json({ message: "ID is required for generation" });
      }
      const campaign = await db
        .collection("campaigns")
        .findOne({ _id: new ObjectId(_id) });

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      let prompt = null;
      if (websiteData ){
        prompt = createPrompt(campaign, websiteData);
      }else{
        prompt = createPrompt(campaign);
      }

      

      if (prompt == null) {
        throw new Error("Uh oh, no prompt was provided");
      }

      const res_ai = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      // retrieve the completion text from response
      const completion = res_ai.choices[0].message.content;

      const response = createResponse(completion);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    return res.status(405).end(); // Method Not Allowed if not a POST request.
  }
}
