import { PropsWithUtility } from '../../../index.js';
import {
  Branch,
  JsxFragmentType,
  BranchTag,
  BranchTemplateJsxFragment,
  ComponentFunctionHandler,
  BranchStatus,
  BranchTemplateFragment,
  FragmentType,
} from '../../types.js';
import { initBranch } from '../../utils/index.js';

export const Fragment = (props: PropsWithUtility) => props as JSX.Element;

export const handleFragmentComponent: ComponentFunctionHandler<
  BranchTemplateFragment,
  FragmentType
> = (template, current, parent, key) => {
  const { type, children, props } = template;

  const branch: Branch<FragmentType> =
    current ??
    initBranch({
      key,
      props,
      type,
      parent,
      tag: BranchTag.Fragment,
      status: BranchStatus.Mounted,
    });

  if (current) {
    current.props = props;
  }

  return { unprocessedChildren: children, branch };
};

export const handleJsxFragmentComponent: ComponentFunctionHandler<
  BranchTemplateJsxFragment,
  JsxFragmentType
> = (template, current, parent, key) => {
  const { type, children, props } = template;

  const branch: Branch<JsxFragmentType> =
    current ??
    initBranch({
      key,
      props,
      type,
      parent,
      tag: BranchTag.JsxFragment,
      status: BranchStatus.Mounted,
    });

  return { unprocessedChildren: children, branch };
};
