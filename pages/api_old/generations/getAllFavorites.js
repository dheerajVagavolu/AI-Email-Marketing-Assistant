import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const favorites = await db.collection("favorites").find().toArray();

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
