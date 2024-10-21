import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewFoodForm from "@/components/food/newFoodForm";

// when the user clicked on Add Food button, it will open this page and send the data that wanted to add to /api/new-food to store at database [Mongodb]
export default function NewFoodPage() {
  const router = useRouter();
  async function addFoodHandler(foodData) {
    const response = await fetch("/api/new-food", {
      method: "POST",
      body: JSON.stringify(foodData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = await response.json();

    // console.log(data);

    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Food</title>
        <meta
          name="description"
          content="Add your own foods and create amazing networking opportunities."
        />
      </Head>
      {/* get the data that the user entered it and send it to addFoodHandler function to send it to database. */}
      <NewFoodForm onAddFood={addFoodHandler} />
    </Fragment>
  );
}
