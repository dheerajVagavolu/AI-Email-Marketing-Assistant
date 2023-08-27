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

    // Use the $exists and $ne MongoDB query operators to find all email data 
    // that has a history key which is not empty.
    const emails = await db.collection("emailData")
      .find({ 
        history: { 
          $exists: true, 
          $ne: [] 
        } 
      })
      .toArray();

    if (!emails.length) {
      return res.status(404).json({ message: "No email data with history found" });
    }

    return res.status(200).json(emails);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
