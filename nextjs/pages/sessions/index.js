import React from "react";
import Head from "next/head";
import SessionsApp from "../../components/SessionsApp";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>hello</h1>
      <SessionsApp />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
