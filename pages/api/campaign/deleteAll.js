import { MongoClient, ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export default async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    if (req.method === "DELETE") {
      const result = await db.collection("campaigns").deleteMany();
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      return res
        .status(200)
        .json({ message: "Successfully deleted all campaigns" });
    } else {
      return res.status(405).end(); // Method not allowed if it's not a POST or DELETE request
    }
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
