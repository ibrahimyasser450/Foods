import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import FoodDetail from "@/components/food/foodDetail";

// when the user click on show details button, it will write in url => localhost:3000/[id] then ensure the id is correct and exists in the database through getStaticPaths at paths, then get the data of the food through getStaticProps and store it in props, and send them to the foodDetail page.
export default function foodDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.foodData.title}</title>
        <meta name="description" content={props.foodData.summary} />
      </Head>
      <FoodDetail
        id={props.foodData.id}
        name={props.foodData.name}
        email={props.foodData.email}
        title={props.foodData.title}
        summary={props.foodData.summary}
        instructions={props.foodData.instructions}
        image={props.foodData.image}
      />
    </Fragment>
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

// get the data of the food of this id and store it in props in foodData.
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
      foodData: {
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
