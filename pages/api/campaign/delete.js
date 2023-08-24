import { MongoClient, ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb+srv://root:UWbZIO78Mo7g3ild@recommender.i5wpqnw.mongodb.net/?retryWrites=true&w=majority");
  return client;
}

export default async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    
    if (req.method === "DELETE") {
      const { _id } = req.body;

      if (!_id) {
        return res.status(400).json({ message: "ID is required for deletion" });
      }

      const result = await db.collection("campaigns").deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      return res.status(200).json({ message: "Successfully deleted campaign" });
    } else if (req.method === "POST") {
      //... [Your existing POST handling code here]
    } else {
      return res.status(405).end(); // Method not allowed if it's not a POST or DELETE request
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
}
