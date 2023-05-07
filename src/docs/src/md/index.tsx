import intro_overview from "./introduction/overview.md";
import getStarted from "./introduction/get-started.md";
import ticTacToe from "./introduction/tic-tac-toe.md";

import comp_overview from "./components/overview.md";
import props from "./components/props.md";
import events from "./components/events.md";

import rules from "./hooks/rules.md";
import useEffect from "./hooks/useEffect.md";
import useState from "./hooks/useState.md";
import useRef from "./hooks/useRef.md";
import useMemo from "./hooks/useMemo.md";

import navigation from "./router/navigation.md";
import setup from "./router/setup.md";

export default {
  introduction: {
    overview: intro_overview,
    getStarted,
    ticTacToe,
  },
  components: {
    overview: comp_overview,
    props,
    events,
  },
  hooks: {
    rules,
    useEffect,
    useRef,
    useState,
    useMemo,
  },
  router: {
    setup,
    navigation,
  },
};
