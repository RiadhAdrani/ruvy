import { areEqual } from "@riadh-adrani/utils";
import { Branch, BranchTemplate } from "../../types.js";

/**
 * @deprecated
 * @param current
 * @param template
 * @returns
 */
const context = (current: Branch, template: BranchTemplate): Array<unknown> => {
  const { props, children } = template;

  const nObject = props.object;
  const nValue = props.value;

  if (!areEqual(nObject, current.props.object)) {
    // TODO : transform into Action
    current.props.object = nObject;
  }

  if (!areEqual(nValue, current.props.value)) {
    // TODO : transform into Action
    current.props.value = nValue;
  }

  return children;
};

export default context;
