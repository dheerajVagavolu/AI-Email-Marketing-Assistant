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
      throw new Error("Cannot find previous data!");
    }

    let updatedPreferences = prevData.preferences;

    if (preferences) {
      for (let key in preferences) {
        if (updatedPreferences[key]) {
          if (Array.isArray(updatedPreferences[key])) {
            updatedPreferences[key].push(...preferences[key]);
          } else if (typeof updatedPreferences[key] === "object") {
            updatedPreferences[key] = {
              ...updatedPreferences[key],
              ...preferences[key]
            };
          } else {
            updatedPreferences[key] = preferences[key];
          }
        } else {
          updatedPreferences[key] = preferences[key];
        }
      }
    }

    const updatedCampaign = Campaign(
      name ? name : prevData.name,
      updatedPreferences,
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
