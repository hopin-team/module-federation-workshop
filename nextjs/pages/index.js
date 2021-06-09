import React from "react";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Home;
