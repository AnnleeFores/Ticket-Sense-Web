import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <App />
    </MantineProvider>
  </Router>
);
