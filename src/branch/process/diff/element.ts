import { areEqual, forEachKey, hasProperty } from "@riadh-adrani/utils";
import { ActionType, Branch, BranchTemplate, PropDiff } from "../../types/index.js";
import { IgnoredProps } from "../../utils/index.js";
import createAction from "../actions/index.js";

export const diffElProps = (
  oldProps: Record<string, unknown>,
  newProps: Record<string, unknown>
): Array<PropDiff> => {
  const out: Array<PropDiff> = [];

  const combined: Record<string, unknown> = { ...oldProps, ...newProps };

  forEachKey((key, value) => {
    if (IgnoredProps.includes(key)) {
      return;
    }

    // if is in new
    if (hasProperty(newProps, key)) {
      // if it is not in old we add it
      if (!hasProperty(oldProps, key)) {
        out.push({ op: "set", priority: 1, prop: key, value });
      } else if (!areEqual(oldProps[key], newProps[key])) {
        out.push({ op: "update", priority: 1, prop: key, value });
      }
    } else {
      out.push({ op: "remove", priority: 1, prop: key, value });
    }
  }, combined);

  return out;
};

/**
 * create a new branch element from a template.
 * @param template element template
 * @param parent parent branch
 * @param key element key
 */
const el = (current: Branch<string>, template: BranchTemplate<string>): Array<unknown> => {
  const { props, children } = template;

  // update props
  const propsDiff = diffElProps(current.props, props);

  // create an action to update props
  current.pendingActions.push(createAction(ActionType.UpdateProps, current, propsDiff));

  // override current props
  current.props = props;

  return children;
};

export default el;