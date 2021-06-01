import React from "react";
import Head from "next/head";
import LoadMF from "../../components/LoadMF";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadMF
        url="http://localhost:8884/remoteEntry.js"
        scope="sessions"
        module="./App"
      />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
