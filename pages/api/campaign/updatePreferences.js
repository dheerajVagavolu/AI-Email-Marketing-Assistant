import Campaign from "@/utils/models/Campaign";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { _id, name, preferences, emailData } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const prevData = await db
      .collection("campaigns")
      .findOne({ _id: new ObjectId(_id) });

    if (!prevData) {
      throw new Error("Cannout find previos data!");
    } else {
      
    }

    const updatedCampaign = Campaign(
      name ? name : prevData.name,
      preferences ? preferences : prevData.preferences,
      emailData ? emailData : prevData.emailData,
    );

    

    const result = await db
      .collection("campaigns")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updatedCampaign });

    return res.status(200).json({ message: "Successfully updated campaign" });
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
