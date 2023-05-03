import { Core } from "../../../core/Core.js";
import { Branch, BranchKey, BranchTag, BranchTemplateFunction } from "../../types/index.js";
import { getOutletDepth, initBranch } from "../../utils/index.js";
import process from "../index.js";

const outlet = (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = initBranch({ key, props, tag: BranchTag.Outlet, type, parent });

  const depth = getOutletDepth(branch) - 1;

  const child = Core.singleton.router?.getComponentByDepth(depth);

  branch.children = [process(child, undefined, branch, 0)];

  return branch;
};

export default outlet;
