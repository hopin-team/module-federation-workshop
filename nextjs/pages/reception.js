import React from "react";
import Head from "next/head";
import LoadVanillaNextMF from "../components/LoadVanillaNextMF";
import LoadWebpackMF from "../components/LoadWebpackMF";
import Nav from "../components/Nav";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {/* <LoadVanillaNextMF dynamicImport={() => import("reception/App")} /> */}
      <LoadWebpackMF
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
