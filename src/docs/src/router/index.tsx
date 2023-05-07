import { Outlet } from "../../../index.js";
import { RuvyNode } from "../../../lib/branch/types/index.js";
import Reference from "../pages/Reference.js";
import MarkdownDoc from "../components/Markdown/MarkdownDoc.js";
import MD from "../md/index.js";
import { RawRoute } from "../../../lib/types/router.js";
import { isString } from "@riadh-adrani/utils";

const reference: Array<{
  path: string;
  title: string;
  redirectTo?: string;
  componentOrUrl: string | RuvyNode;
}> = [
  {
    path: "",
    title: "Reference",
    redirectTo: "/reference/intro/overview",
    componentOrUrl: <Reference />,
  },

  // Intro
  {
    path: "/intro",
    title: "Introduction",
    redirectTo: "/reference/intro/overview",
    componentOrUrl: <Outlet />,
  },
  {
    path: "/intro/overview",
    title: "Overview",
    componentOrUrl: MD.introduction.overview,
  },
  {
    path: "/intro/get-started",
    title: "Get Started",
    componentOrUrl: MD.introduction.getStarted,
  },
  {
    path: "/intro/tic-tac-toe",
    title: "Tic Tac Toe",
    componentOrUrl: MD.introduction.ticTacToe,
  },

  // components
  {
    path: "/components",
    title: "Components",
    redirectTo: "/reference/components/overview",
    componentOrUrl: <Outlet />,
  },
  {
    path: "/components/overview",
    title: "Overview",
    componentOrUrl: MD.components.overview,
  },
  {
    path: "/components/props",
    title: "Props",
    componentOrUrl: MD.components.props,
  },
  {
    path: "/components/events",
    title: "Events",
    componentOrUrl: MD.components.events,
  },

  // hooks
  {
    path: "/hooks",
    title: "Hooks",
    redirectTo: "/reference/hooks/rules",
    componentOrUrl: <Outlet />,
  },
  {
    path: "/hooks/rules",
    title: "Rules of Hooks",
    componentOrUrl: MD.hooks.rules,
  },
  {
    path: "/hooks/use-state",
    title: "UseState",
    componentOrUrl: MD.hooks.useState,
  },
  {
    path: "/hooks/use-effect",
    title: "UseEffect",
    componentOrUrl: MD.hooks.useEffect,
  },
  {
    path: "/hooks/use-memo",
    title: "UseMemo",
    componentOrUrl: MD.hooks.useMemo,
  },
  {
    path: "/hooks/use-ref",
    title: "UseRef",
    componentOrUrl: MD.hooks.useRef,
  },

  // hooks
  {
    path: "/router",
    title: "Router",
    redirectTo: "/router/setup",
    componentOrUrl: <Outlet />,
  },
  {
    path: "/router/setup",
    title: "Setup Routing",
    componentOrUrl: MD.router.setup,
  },
  {
    path: "/router/navigation",
    title: "Navigation",
    componentOrUrl: MD.router.navigation,
  },
];

export const referenceRoutes = reference.map<RawRoute<RuvyNode>>((item) => ({
  component: isString(item.componentOrUrl) ? (
    <MarkdownDoc url={item.componentOrUrl as string} />
  ) : (
    (item.componentOrUrl as RuvyNode)
  ),
  path: `/reference${item.path}`,
  redirectTo: item.redirectTo,
  title: item.title,
}));
