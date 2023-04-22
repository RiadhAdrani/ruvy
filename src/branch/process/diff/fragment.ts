import { BranchTemplateFragment } from "../../types/index.js";

/**
 * create a new fragment branch from a template.
 * @param template fragment template
 */
const fragment = (template: BranchTemplateFragment): Array<unknown> => {
  const { children } = template;

  return children;
};

export default fragment;
