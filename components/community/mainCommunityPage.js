import Image from "next/image";
import Head from "next/head";
import foodIcon from "@/public/icons/food.png";
import communityIcon from "@/public/icons/community.png";
import eventsIcon from "@/public/icons/events.png";
import classes from "./mainCommunityPage.module.css";

export default function MainCommunityPage() {
  return (
    <>
      <Head>
        <title>Foods Community</title>
        <meta
          name="description"
          content="Join our community and share your favorite recipes."
        />
      </Head>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2>Community Perks</h2>

        <ul className={classes.perks}>
          <li>
            <Image src={foodIcon} alt="A delicious food" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}
