import Link from "next/link";
import Image from "next/image";

import classes from "./foodItem.module.css";

// for each food, it will show each food card
export default function FoodItem({ _id, name, title, image, summary }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {name}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/${_id}`}>View Details</Link>
          <Link className={classes.edit} href={`/edit-food/${_id}`}>
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}
