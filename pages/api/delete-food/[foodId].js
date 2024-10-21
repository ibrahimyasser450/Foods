import { MongoClient, ObjectId } from "mongodb";

// if the user clicked on delete button at FoodDetail.js, it will take the foodId from the URL and delete it from the database.
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const foodId = req.query.foodId;

    const client = await MongoClient.connect(
      "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const foodsCollection = db.collection("foods");

    const result = await foodsCollection.deleteOne({
      _id: new ObjectId(foodId),
    });

    client.close();

    res.status(200).json({ message: "Food deleted!" });
  }
}
