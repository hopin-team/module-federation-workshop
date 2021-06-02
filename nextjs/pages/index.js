import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <h1>Home page</h1>
    </div>
  );
};

export const getInitialProps = async (ctx) => {
  return {};
};

export default Home;
