import { PropsWithUtility } from 'src/index.js';
import { createNewBranchChildren } from '../../../branch/index.js';
import { Branch, BranchKey, BranchTag, BranchTemplate } from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';

export type PortalProps = PropsWithUtility<{ container: Element }>;

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

  branch.children = createNewBranchChildren(children ?? [], branch);

  return branch;
};

export default portal;
