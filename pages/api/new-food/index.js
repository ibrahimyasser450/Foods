import { MongoClient } from "mongodb";
// localhost:3000/api/new-food/index.js -> POST

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { name, email, title, summary, instructions, image } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const foodsCollection = db.collection("foods");

    const result = await foodsCollection.insertOne(data);

    client.close();

    res.status(200).json({ message: "Food added successfully!" });
  }
}
