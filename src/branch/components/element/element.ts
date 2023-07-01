import {
  ActionType,
  Branch,
  BranchTag,
  BranchTemplate,
  ComponentFunctionHandler,
  PropDiff,
} from '../../types.js';
import {
  IgnoredProps,
  assignRef,
  initBranch,
  postprocessProps,
  preprocessProps,
} from '../../utils/index.js';
import createAction from '../../actions/index.js';
import { areEqual, forEachKey, hasProperty, isUndefined } from '@riadh-adrani/utils';

/**
 * creates a diffing array for two element props
 * @param oldProps old props
 * @param newProps new props
 *
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

export const handleElementComponent: ComponentFunctionHandler<BranchTemplate<string>, string> = (
  template,
  current,
  parent,
  key
) => {
  const { type, props, children } = template;

  const branch: Branch<string> =
    current ??
    initBranch({
      tag: BranchTag.Element,
      type,
      parent,
      key,
      props: preprocessProps(props),
    });

  postprocessProps(branch);

  if (isUndefined(current)) {
    const renderAction = createAction(ActionType.Render, branch);

    branch.pendingActions.push(renderAction);
  } else {
    // update props
    const propsDiff = diffElementProps(branch.props, props);

    if (propsDiff.length > 0) {
      // create an action to update props
      branch.pendingActions.push(createAction(ActionType.UpdateProps, branch, propsDiff));

      // override current props
      branch.props = props;
    }
  }

  assignRef(branch, props);

  return {
    branch,
    unprocessedChildren: children,
  };
};

export default handleElementComponent;
