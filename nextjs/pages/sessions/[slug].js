import React from "react";
import Head from "next/head";
import LoadNextMF from "../../components/LoadNextMF";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadNextMF
        url="http://localhost:8884/remoteEntry.js"
        scope="session"
        module="./App"
      />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
