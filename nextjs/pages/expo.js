import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";
import Nav from "../components/Nav";

const Expo = ({ pathname, basename }) => {
  return (
    <div>
      <Head>
        <title>Expo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadNextMF
        url="http://localhost:8882/remoteEntry.js"
        scope="expo"
        module="./App"
        pathname={pathname}
        basename={basename}
      />
    </div>
  );
};

export async function getServerSideProps({ req, resolvedUrl }) {
  // We need this because shallow routing only works for same page URL changes (https://nextjs.org/docs/routing/shallow-routing#caveats)
  const url = require("url").parse(resolvedUrl);
  const basename = url.pathname; // basename is the path to this file after /pages. E.g. /pages/expo.js = /expo
  let pathname = req.url.startsWith("/_next/data") ? basename : req.url;

  if (url.query) {
    const searchParams = new URLSearchParams(url.query);
    pathname = `${basename}/${[...searchParams.values()].join("/")}`;
  }

  return {
    props: { pathname, basename },
  };
}

export default Expo;
