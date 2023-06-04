import { runAfter } from "@riadh-adrani/utils";
import { mountApp, usePromise } from "../src/index.js";

const App = () => {
  const [state, count, refresh] = usePromise<number>(async () => {
    const v = await runAfter(1000, () => 300);

    return v as number;
  });

  return (
    <button onclick={refresh}>
      {state === "pending"
        ? "Pending"
        : state === "refreshing"
        ? "Refreshing"
        : state === "rejected"
        ? "Click to refresh"
        : count}
    </button>
  );
};

mountApp({ callback: App, hostElement: document.body });
