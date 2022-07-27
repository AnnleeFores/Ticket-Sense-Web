import React, { useState } from "react";
import Listing from "../components/Listing";
import Main from "../components/Main";

const Home = () => {
  const [data, setData] = useState(false);

  const childToParent = async (childdata) => {
    setData(childdata);
  };

  return (
    <>
      <Main childToParent={childToParent} />
      <Listing parentToChild={data} />
    </>
  );
};

export default Home;
