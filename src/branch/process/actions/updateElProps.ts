import { Callback, isFunction } from "@riadh-adrani/utils";
import { Branch, PropDiff } from "../../types/index.js";
import {
  DomAttribute,
  isOnEventName,
  removeAttribute,
  removeEvent,
  setAttribute,
  setEvent,
} from "@riadh-adrani/dom-utils";

const createElPropsUpdateAction = (branch: Branch<string>, diffs: Array<PropDiff>): Callback => {
  return () => {
    // we can sort by priority

    diffs.forEach((diff) => {
      const { op, prop, value } = diff;

      const instance = branch.instance as Element;

      // event
      if (isOnEventName(prop) && isFunction(value)) {
        const callback = value as Callback;

        if (op === "remove") {
          removeEvent(prop, instance);
        } else {
          setEvent(prop, callback, instance);
        }

        return;
      }

      // attribute
      if (op === "remove") {
        removeAttribute(prop, instance);
      } else {
        setAttribute(prop, value as DomAttribute, instance);
      }
    });
  };
};

export default createElPropsUpdateAction;
