import { Router } from "./router";
import { getRouteFromUrl } from "./router/utils";

const router = new Router(
  [
    {
      path: "/",
      routes: [
        { path: "about" },
        { path: "feed" },
        { path: "other" },
        { path: "user", routes: [{ path: ":id" }] },
      ],
    },
  ],
  {
    onStateChange: () => {
      // console.log("hello");
    },
    base: "yet",
  }
);

router.push("/yet/world?token=gfdlkmsq");

console.log(getRouteFromUrl());
