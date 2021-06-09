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
        url="https://localhost:8080/remoteEntry.js"
        scope="slice_hello"
        module="Index"
      />
      {/* <LoadNextMF
        url="https://assets-cdn.slices.hopin.com/slices/slice-schedules/1.12.0/remoteEntry.js"
        scope="slice_schedules"
        module="Index"
      /> */}
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Home;
