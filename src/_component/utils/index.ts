import { ComputedComponent } from "../../types/_component.js";

export const getComponentParentPath = (
  component: ComputedComponent<unknown>
): Array<number | string> => {
  const path = [component.key];

  if (component.parent) {
    path.push(...getComponentParentPath(component.parent));
  }

  return path.flat(Infinity);
};
