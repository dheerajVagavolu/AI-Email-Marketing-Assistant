import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb+srv://root:UWbZIO78Mo7g3ild@recommender.i5wpqnw.mongodb.net/?retryWrites=true&w=majority");
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { id, name, preferences } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "ID and Name are required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const updatedCampaign = {
      name,
      preferences: preferences || {},
    };

    const result = await db.collection("campaigns").updateOne({ _id: ObjectId(id) }, { $set: updatedCampaign });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Campaign not found or no changes made" });
    }

    return res.status(200).json({ message: "Successfully updated campaign" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
