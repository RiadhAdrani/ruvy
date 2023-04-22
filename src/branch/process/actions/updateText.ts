import { Callback, cast } from "@riadh-adrani/utils";
import { setTextNodeData } from "@riadh-adrani/dom-utils";
import { Branch } from "../../types/index.js";

const createTextUpdateAction = (branch: Branch, data: string): Callback => {
  return () => setTextNodeData(cast<Text>(branch.instance), data);
};

export default createTextUpdateAction;
