import { MongoClient } from "mongodb";
import FoodsGrid from "@/components/food/foodsGrid";
import MainFoodPage from "@/components/food/mainFoodPage";

// Main page of the foods page, if don't use search and open the page it will return all foods, if searchQuery is value and includes in title return all foods matching the value, if searchQuery is value and doesn't include in title return No food title matching.
export default function FoodsPage({ foodsData, searchQuery }) {
  return (
    <MainFoodPage>
      {foodsData.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#ddd6cb",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          No food title matching "{searchQuery}" was found.
        </p>
      ) : (
        <FoodsGrid foods={foodsData} />
      )}
    </MainFoodPage>
  );
}

// Fetch the data server-side because i use search i want when use the search get all the data at this moment.
export async function getServerSideProps(context) {
  const searchQuery = context.query.search || "";

  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const foodsCollection = db.collection("foods");

  const foods = await foodsCollection.find().toArray();

  client.close();

  // Filter foods based on search query, if searchQuery is value and includes in title return all foods matching the value, if searchQuery is value and doesn't include in title return no foods
  const filteredFoods = foods
    .map((food) => ({
      ...food,
      _id: food._id.toString(), // Convert ObjectId to string for serialization
    }))
    .filter((food) =>
      food.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return {
    props: {
      foodsData: filteredFoods, // Pass the filtered foods to the page
      searchQuery, // Pass the search query for displaying if no foods are found
    },
  };
}
