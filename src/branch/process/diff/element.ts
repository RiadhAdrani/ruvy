import { areEqual, forEachKey, hasProperty } from '@riadh-adrani/utils';
import { ActionType, Branch, BranchTemplate, PropDiff } from '../../types.js';
import { IgnoredProps, assignRef, preprocessProps } from '../../utils/index.js';
import createAction from '../actions/index.js';

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
const element = (current: Branch<string>, template: BranchTemplate<string>): Array<unknown> => {
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

export default element;
