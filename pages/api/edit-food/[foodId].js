// pages/api/edit-food/[foodId].js
import { MongoClient, ObjectId } from "mongodb";

// take new data and ensure it is valid and update the food in MongoDB.
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const foodId = req.query.foodId;

    const updatedData = req.body;

    // Validate input data (optional but recommended)
    if (
      !updatedData ||
      !updatedData.name ||
      !updatedData.email ||
      !updatedData.title ||
      !updatedData.summary ||
      !updatedData.instructions ||
      !updatedData.image
    ) {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const foodsCollection = db.collection("foods");

    // Update the food document in MongoDB
    const result = await foodsCollection.updateOne(
      { _id: new ObjectId(foodId) },
      { $set: updatedData }
    );

    client.close();

    res.status(200).json({ message: "Food updated!" });
  }
}
