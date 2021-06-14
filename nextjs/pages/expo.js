import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";

const Expo = ({ path, basename }) => {
  return (
    <div>
      <Head>
        <title>Expo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadNextMF
        url="http://localhost:8882/remoteEntry.js"
        scope="expo"
        module="./App"
        path={path}
        basename={basename}
      />
    </div>
  );
};

export async function getServerSideProps({ req, resolvedUrl }) {
  // We need this because shallow routing only works for same page URL changes (https://nextjs.org/docs/routing/shallow-routing#caveats)
  const url = require("url").parse(resolvedUrl);
  const basename = url.pathname;
  let path = req.url.startsWith("/_next/data") ? basename : req.url;

  if (url.query) {
    const searchParams = new URLSearchParams(url.query);
    path = `${basename}/${[...searchParams.values()].join("/")}`;
  }

  return {
    props: { path, basename },
  };
}

export default Expo;
