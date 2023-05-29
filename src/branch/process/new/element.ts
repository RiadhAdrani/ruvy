import { ActionType, Branch, BranchKey, BranchTag, BranchTemplate } from "../../types.js";
import { initBranch, preprocessProps } from "../../utils/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";
import createAction from "../actions/index.js";
import { haveDuplicateKey } from "../../check/index.js";

/**
 * create a new branch element from a template.
 * @param template element template
 * @param parent parent branch
 * @param key element key
 */
const element = (
  template: BranchTemplate<string>,
  parent: Branch,
  key: BranchKey
): Branch<string> => {
  const { props, type, children } = template;

  const branch: Branch<string> = initBranch({
    tag: BranchTag.Element,
    type,
    parent,
    key,
    props: preprocessProps(props),
  });

  const renderAction = createAction(ActionType.Render, branch);

  branch.pendingActions.push(renderAction, ...collectPendingEffect(branch));

  if (haveDuplicateKey(children)) {
    throw `Duplicate key detected within Component (${branch.type})`;
  }

  branch.children = children.map((child, index) => process(child, undefined, branch, index));

  return branch;
};

export default element;
