import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadNextMF
        url="http://localhost:8886/remoteEntry.js"
        scope="reception"
        module="./App"
        //reactiveKeys={["username"]}
      />
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Reception;
