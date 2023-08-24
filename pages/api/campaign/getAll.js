import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb+srv://root:UWbZIO78Mo7g3ild@recommender.i5wpqnw.mongodb.net/?retryWrites=true&w=majority");
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

    const campaigns = await db.collection("campaigns").find().toArray();

    return res.status(200).json(campaigns);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
