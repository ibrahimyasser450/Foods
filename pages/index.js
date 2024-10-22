import Head from "next/head";
import { Fragment } from "react";
import Link from "next/link";
import classes from "../styles/home.module.css";
import ImageSlideshow from "@/components/image/imageSlideshow";
export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>NextLevel Food</title>
        <meta
          name="description"
          content="Delicious foods, shared by a food-loving community."
        />
      </Head>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          {/* change the image after 3 seconds */}
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/foods">Explore Foods</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </Fragment>
  );
}
