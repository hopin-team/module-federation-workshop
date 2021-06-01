import React from "react";
import Head from "next/head";
import LoadMF from "../components/LoadMF";
import Nav from "../components/Nav";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadMF
        url="http://localhost:8886/remoteEntry.js"
        scope="reception"
        module="./App"
      />
    </div>
  );
};

Reception.getInitialProps = async (ctx) => {
  return {};
};

export default Reception;
