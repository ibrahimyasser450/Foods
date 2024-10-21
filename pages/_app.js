import Head from "next/head";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

// this is the main page of our app containing content of our different pages and the header

export default function App({ Component, pageProps }) {
  {
    /* <Layout></Layout> => this is the header of our app, if the pages are changed, will still same header */
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/iconApp.ico" />{" "}
        {/* == public/icons/iconApp.ico */}
      </Head>
      <Layout>
        {/* actual page content of our different pages, it will change whenever we navigate from page A to page B. [ page content will change depending on the page] */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
