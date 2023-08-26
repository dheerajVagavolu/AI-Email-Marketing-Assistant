import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed if it's not a POST request
  }

  const { campaignId, email } = req.body;

  if (!campaignId || !email) {
    return res.status(400).json({ message: "Name and email body are required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const newFavorite = {
      campaignId: campaignId,
      email: email,
      createdAt: new Date(),
    };

    const result = await db.collection("favorites").insertOne(newFavorite);
    const insertedId = result.insertedId;


    return res.status(201).json({ message: "Successfully added Favorite", favoriteId: insertedId });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}

