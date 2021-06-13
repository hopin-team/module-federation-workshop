import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";
import Nav from "../components/Nav";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
      </Head>
      <Nav />
      TODO Mount Reception here
    </div>
  );
};

Reception.getInitialProps = async (ctx) => {
  return {};
};

export default Reception;
