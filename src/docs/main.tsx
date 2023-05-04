import { createRouter, mountApp } from "../index.js";
import App from "./App.js";
import Home from "./src/pages/Home.js";

import "./index.scss";
import "virtual:uno.css";
import Reference from "./src/pages/Reference.js";
import About from "./src/pages/About.js";
import IntroductionMain from "./src/pages/Reference/Introduction/Introduction.main.js";

const hostElement = document.getElementById("app") as HTMLElement;

const callback = App;

createRouter(
  [
    {
      path: "/",
      component: <Home />,
      title: "Ruvy",
      routes: [
        {
          path: "reference",
          component: <Reference />,
          title: "Ruvy | Reference",
          routes: [{ path: "introduction", component: <IntroductionMain /> }],
        },
        { path: "about", component: <About />, title: "Ruvy | About" },
      ],
    },
  ],
  { base: "/RiadhAdrani" }
);

mountApp({ callback, hostElement });
