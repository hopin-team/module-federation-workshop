import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";

const Expo = () => {
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
      />
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Expo;
