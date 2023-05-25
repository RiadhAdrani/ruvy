import { createRouter, mountApp } from "../index.js";
import App from "./App.js";
import Home from "./src/pages/Home.js";

import "./index.scss";
import "virtual:uno.css";
import { referenceRoutes } from "./src/router/index.js";

const hostElement = document.getElementById("app") as HTMLElement;

const callback = App;

createRouter(
  [
    {
      path: "/",
      component: <Home />,
      title: "Ruvy",
    },
    { path: "/*", component: "Not Found" },
    { path: "/**", component: "Not Found all" },
    ...referenceRoutes,
  ],
  { base: "/ruvy", scrollToTop: true }
);

mountApp({ callback, hostElement });
