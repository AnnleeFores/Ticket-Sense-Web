import Navbar from "../components/Navbar";
import React, { useState } from "react";
import Listing from "../components/Listing";
import Main from "../components/Main";

const Home = () => {
  return (
    <>
      <Navbar />
      <Main />
      <Listing />
    </>
  );
};

export default Home;
