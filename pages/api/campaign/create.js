import Campaign from "@/utils/models/Campaign";
import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed if it's not a POST request
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const newCampaign = Campaign(name);

    const result = await db.collection("campaigns").insertOne(newCampaign)
    const insertedId = result.insertedId;

    return res.status(201).json({ _id:insertedId, message: "Successfully added campaign!" });
    
    return res.status(201).json({ message: "Successfully added Campaign!-2" });
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
