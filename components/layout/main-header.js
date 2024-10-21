import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/logo.png";
import classes from "./main-header.module.css";
import HeaderBackground from "./header-background";
import NavLink from "./nav-link";

// static navigation [header] for the app
export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push("/foods?search=" + searchQuery); // Redirect to home with search query
      setSearchQuery(""); // make search query empty
    }
  }

  return (
    <>
      <HeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <form onSubmit={handleSearch} className={classes.searchForm}>
          <input
            type="text"
            placeholder="Search Foods"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classes.searchInput}
          />
          <button type="submit" className={classes.searchButton}>
            Search
          </button>
        </form>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/foods">All Foods</NavLink>
            </li>
            <li>
              <NavLink href="/new-food">Add New Food</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foods Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
