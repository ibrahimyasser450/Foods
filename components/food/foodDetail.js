import Image from "next/image";
import classes from "./foodDetail.module.css";
import { useRouter } from "next/router";

export default function FoodDetailsPage(props) {
  const router = useRouter();
  const foodId = router.query.foodId;

  // if i want to delete the food
  async function deleteFoodHandler() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );
    // if the user confirms delete, it will send a delete request to the server [database] with the foodId that was clicked and it will redirect to the home page.
    if (confirmDelete) {
      await fetch("/api/delete-food/" + foodId, {
        method: "DELETE",
      });
      router.push("/");
    }
  }
  const formattedInstructions = props.instructions.replace(/\n/g, "<br />"); // new format for instructions

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={props.image} alt={props.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{props.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${props.email}`}>{props.name}</a>
          </p>
          <p className={classes.summary}>{props.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: formattedInstructions }} // to write the instructions in html
        ></p>
        <div className={classes.actions}>
          <button onClick={deleteFoodHandler} className={classes.deleteButton}>
            Delete Food
          </button>
        </div>
      </main>
    </>
  );
}
