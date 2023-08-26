import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { campaignId } = req.query;

  if (!campaignId) {
    return res.status(400).json({ message: "ID is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const campaign = await db.collection("emailData").find({ campaignId: campaignId }).toArray();

    if (!campaign) {
      return res.status(404).json({ message: "emailData not found" });
    }

    return res.status(200).json(campaign);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
