import Link from "next/link";
import Head from "next/head";
import classes from "./mainFoodPage.module.css";

// main page of the foods page => localhost:3000/foods
// that contains the header and the main content of the page
export default function MainFoodPage({ children }) {
  return (
    <>
      <Head>
        <title>All Foods</title>
        <meta
          name="description"
          content="Browse the delicious foods shared by our vibrant community."
        />
      </Head>
      <header className={classes.header}>
        <h1>
          Delicious foods, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself.</p>
        <p className={classes.cta}>
          <Link href="/new-food">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>{children}</main>
    </>
  );
}
