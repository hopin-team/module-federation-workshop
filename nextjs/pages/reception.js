import React from "react";
import Head from "next/head";
import LoadVanillaNextMF from "../components/LoadVanillaNextMF";
import Nav from "../components/Nav";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <LoadVanillaNextMF dynamicImport={() => import("reception/App")} />
    </div>
  );
};

Reception.getInitialProps = async (ctx) => {
  return {};
};

export default Reception;
