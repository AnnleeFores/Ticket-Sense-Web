import React from "react";
import Main from "../components/Main";
import { MantineProvider } from "@mantine/core";

const Home = () => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Main />
      </MantineProvider>
    </>
  );
};

export default Home;
