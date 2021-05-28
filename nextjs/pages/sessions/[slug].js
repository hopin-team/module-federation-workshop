import React from "react";
import Head from "next/head";
import LoadVanillaNextMF from "../../components/LoadVanillaNextMF";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadVanillaNextMF dynamicImport={() => import("session/App")} />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
