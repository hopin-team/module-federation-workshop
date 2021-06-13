import React from "react";
import Head from "next/head";
import LoadNextMF from "../../components/LoadNextMF";

const Sessions = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadNextMF
        url="http://localhost:8885/remoteEntry.js"
        scope="sessions"
        module="./App"
      />
    </div>
  );
};

Sessions.getInitialProps = async (ctx) => {
  return {};
};

export default Sessions;
