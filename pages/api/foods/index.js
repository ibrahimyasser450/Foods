import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const foodsCollection = db.collection("foods");

    const foods = await foodsCollection.find().toArray();
    client.close();

    res.status(200).json({ foods });
  }
}
