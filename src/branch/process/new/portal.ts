import { process } from '../../../branch/index.js';
import { Branch, BranchKey, BranchTag, BranchTemplate } from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';

export interface PortalProps {
  container: Element;
  key?: BranchKey;
  children?: Array<unknown>;
}

export const Portal = (props: PortalProps) => props as unknown as JSX.Element;

export type PortalBranchType = typeof Portal;

/**
 * create a new portal branch from the given template
 * @param template component template
 * @param parent parent branch
 * @param key component key
 */
const portal = (
  template: BranchTemplate<PortalBranchType>,
  parent: Branch,
  key: BranchKey
): Branch<PortalBranchType> => {
  const { type, props } = template;
  const { children, container } = props as unknown as PortalProps;

  const branch = initBranch<PortalBranchType>({
    tag: BranchTag.Portal,
    type,
    parent,
    key,
    props,
    instance: container,
  });

  branch.children = (children ?? []).map((child, index) =>
    process(child, undefined, branch, index)
  );

  return branch;
};

export default portal;