import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { applyTheme, getInitialTheme } from "./theme";

import "./index.css";

// Set the theme before the first render so the page never paints the wrong colors
applyTheme(getInitialTheme());

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
