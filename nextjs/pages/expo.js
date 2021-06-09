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
  const url = require("url");
  const URL = url.parse(resolvedUrl);
  const basename = URL.pathname;
  let path = req.url.startsWith("/_next/data") ? basename : req.url;

  if (URL.query) {
    const searchParams = new URLSearchParams(URL.query);
    path = `${basename}/${[...searchParams.values()].join("/")}`;
  }

  return {
    props: { path, basename },
    notFound: false,
  };
}

export default Expo;
