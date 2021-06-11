import React from "react";
import Head from "next/head";
import LoadNextMF from "../components/LoadNextMF";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
      <LoadNextMF
        url="https://assets-cdn-dev.slices.hopin.com/slices/slice-hello/d02bcd1/remoteEntry.js"
        scope="slice_hello"
        module="Index"
      />
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Home;
