// pages/edit-food/[foodId].js
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import NewFoodForm from "@/components/food/newFoodForm";
import { useRouter } from "next/router";

// if the user click on edit button at foodItem.js, will open this page and send the data that wanted to edit to newFoodForm.js and Prefill the form with existing data and the user change any field and click on Edit Food button, it will take enteredFoodData and the foodId from the URL to save new data for this food.
export default function EditFoodPage(props) {
  const router = useRouter();
  const foodId = router.query.foodId; // Fetch the foodId from the URL

  async function editFoodHandler(enteredFoodData) {
    const response = await fetch("/api/edit-food/" + foodId, {
      method: "PUT",
      body: JSON.stringify(enteredFoodData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = await response.json();

    // console.log(data);

    router.push("/"); // Redirect to home after successful update
  }

  return (
    <>
      <Head>
        <title>Edit {props.food.title}</title>
        <meta name="description" content={props.food.summary} />
      </Head>
      <NewFoodForm
        onAddFood={editFoodHandler}
        food={props.food} // Prefill the form with existing data
      />
    </>
  );
}

// ensure the id is correct and exists in the database through paths and if not exists it will return 404 [not found]
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const foodsCollection = db.collection("foods");
  const foods = await foodsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking", // false => means paths contains all supported foodIds if the user entering anything not supported in paths will return 404 [not found] for example "m3"
    paths: foods.map((food) => ({
      params: { foodId: food._id.toString() },
    })),
  };
}

// get the data of the food of this id and store it in props in food to send it to EditFoodPage function in the first line to send it to NewFoodForm.
export async function getStaticProps(context) {
  const foodId = context.params.foodId;
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/foods?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const foodsCollection = db.collection("foods");
  const selectedFood = await foodsCollection.findOne({
    _id: new ObjectId(foodId),
  });
  client.close();
  return {
    props: {
      food: {
        id: selectedFood._id.toString(),
        name: selectedFood.name,
        email: selectedFood.email,
        title: selectedFood.title,
        summary: selectedFood.summary,
        instructions: selectedFood.instructions,
        image: selectedFood.image,
      },
    },
  };
}
