import Campaign from "@/utils/models/Campaign";
import EmailData from "@/utils/models/EmailData";
import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed if it's not a POST request
  }

  const { campaignId, emailText } = req.body;

  if (!emailText) {
    return res.status(400).json({ message: "emailText is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const newEmail = EmailData(campaignId, emailText);

    const result = await db.collection("emailData").insertOne(newEmail);
    const insertedId = result.insertedId;
    
    return res
      .status(201)
      .json({ _id: insertedId, message: "Successfully added Email!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
