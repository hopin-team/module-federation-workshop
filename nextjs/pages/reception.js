import React from "react";
import Head from "next/head";
import LoadNextSlice from "../components/LoadNextSlice";

const Reception = () => {
  return (
    <div>
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadNextSlice dynamicImport={() => import("reception/App")} />
    </div>
  );
};

Reception.getInitialProps = async (ctx) => {
  return {};
};

export default Reception;
