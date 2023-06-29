import {
  ActionType,
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  ComponentHandler,
  PropDiff,
} from '../../types.js';
import {
  IgnoredProps,
  assignRef,
  initBranch,
  postprocessProps,
  preprocessProps,
} from '../../utils/index.js';
import { collectPendingEffect } from '../../utils/index.js';
import { createNewBranchChildren } from '../../process/index.js';
import createAction from '../../actions/index.js';
import { areEqual, forEachKey, hasProperty } from '@riadh-adrani/utils';

/**
 * create a new branch element from a template.
 * @param template element template
 * @param parent parent branch
 * @param key element key
 */
const create = (
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

  postprocessProps(branch);

  const renderAction = createAction(ActionType.Render, branch);

  branch.pendingActions.push(renderAction, ...collectPendingEffect(branch));

  branch.children = createNewBranchChildren(children, branch);

  return branch;
};

/**
 * creates a diffing array for two element props
 * @param oldProps old props
 * @param newProps new props
 */
export const diffElementProps = (
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
        out.push({ op: 'set', priority: 1, prop: key, value });
      } else if (!areEqual(oldProps[key], newProps[key])) {
        out.push({ op: 'update', priority: 1, prop: key, value });
      }
    } else {
      out.push({ op: 'remove', priority: 1, prop: key, value });
    }
  }, combined);

  return out;
};

/**
 * diffs branch element from a template.
 * @param template element template
 * @param parent parent branch
 * @param key element key
 */
const diff = (template: BranchTemplate<string>, current: Branch<string>): Array<unknown> => {
  // preprocess props
  template.props = preprocessProps(template.props);

  const { props, children } = template;

  // update props
  const propsDiff = diffElementProps(current.props, props);

  // create an action to update props
  current.pendingActions.push(createAction(ActionType.UpdateProps, current, propsDiff));

  // override current props
  current.props = props;

  assignRef(current, props);

  return children;
};

const elementComponentHandler: ComponentHandler<string, BranchTemplate<string>> = {
  create,
  diff,
};

export default elementComponentHandler;
