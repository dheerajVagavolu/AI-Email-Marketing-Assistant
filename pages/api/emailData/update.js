import Campaign from "@/utils/models/Campaign";
import EmailData from "@/utils/models/EmailData";
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

  const { _id, emailText, favorite } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();

    const prevData = await db
      .collection("emailData")
      .findOne({ _id: new ObjectId(_id) });

    if (!prevData) {
      throw new Error("Cannot find previous data!");
    } else {
      // console.log(emailText);
    }

    const prevDataCopy = JSON.parse(JSON.stringify(prevData));

    // console.log("\n\n\nPrev: \n\n\n" + JSON.stringify(prevData));

    let updatedHistory = prevDataCopy.history;

    // console.log("Updated: " + updatedHistory);
    // console.log(emailText);
    // console.log(prevDataCopy.emailText);
    

    if (emailText && emailText !== prevDataCopy.emailText) {
      updatedHistory.push(prevDataCopy.emailText);
    }

    // console.log("Updated: " + updatedHistory);

    const updatedEmailData = EmailData(
      prevDataCopy.campaignId,
      emailText || prevDataCopy.emailText,
      favorite !== undefined ? favorite : prevDataCopy.favorite,
      updatedHistory
    );

    // console.log(updatedEmailData);

    const result = await db
      .collection("emailData")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updatedEmailData });

    return res.status(200).json({ message: "Successfully updated EmailData" });
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
