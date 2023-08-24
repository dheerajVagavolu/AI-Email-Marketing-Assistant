import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    process.env.MongoDB_URL
  );
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { _id, name, preferences, lastUsed } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const updatedCampaign = {
      name,
      preferences: preferences || {},
      lastUsed,
    };

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
