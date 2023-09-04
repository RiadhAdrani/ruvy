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
import createAction from '../../actions/actions.js';
import { areEqual, forEachKey, hasProperty, getType } from '@riadh-adrani/obj-utils';

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

  const $props = preprocessProps(props);

  const branch: Branch<string> =
    current ??
    initBranch({
      tag: BranchTag.Element,
      type,
      parent,
      key,
      props: $props,
    });

  const innerHTML = $props['dom:innerHTML'];

  const skipChildrenProcessing = getType(innerHTML) === 'string';

  if (!current) {
    const renderAction = createAction(ActionType.Render, branch);

    branch.pendingActions.push(renderAction);

    // check innerHTML
    if (getType(innerHTML) === 'string') {
      const renderInnerHTMLAction = createAction(ActionType.RenderInnerHTML, branch, innerHTML);

      branch.pendingActions.push(renderInnerHTMLAction);
    }

    // we check for `dom:focused` to be truthy
    if ($props['dom:focused']) {
      // create a new action that will focus the element when mounted

      const focusAction = createAction(ActionType.Mounted, branch, (branch: Branch) => {
        (branch.instance as HTMLElement).focus?.();
      });

      branch.pendingActions.push(focusAction);
    }
  } else {
    // update props
    const propsDiff = diffElementProps(branch.props, $props);

    if (propsDiff.length > 0) {
      // create an action to update props
      branch.pendingActions.push(createAction(ActionType.UpdateProps, branch, propsDiff));
    }

    if (innerHTML !== branch.props['dom:innerHTML']) {
      const renderInnerHTMLAction = createAction(ActionType.RenderInnerHTML, branch, innerHTML);

      branch.pendingActions.push(renderInnerHTMLAction);
    }

    // override current props
    branch.props = $props;
  }

  postprocessProps(branch);

  assignRef(branch, props);

  return {
    branch,
    unprocessedChildren: children,
    skipChildrenProcessing,
  };
};

export default handleElementComponent;
