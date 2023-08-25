import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed if it's not a POST request
  }

  const { name, preferences } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const newCampaign = {
      name,
      preferences: preferences || {},
      createdAt: new Date(),
      lastUsed: null // Since it's just created, it hasn't been used yet
    };

    await db.collection("campaigns").insertOne(newCampaign);

    return res.status(201).json({ message: "Successfully added campaign" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}

