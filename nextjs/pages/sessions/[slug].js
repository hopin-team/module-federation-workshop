import React from "react";
import Head from "next/head";
import LoadNextSlice from "../../components/LoadNextSlice";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadNextSlice dynamicImport={() => import("session/App")} />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
