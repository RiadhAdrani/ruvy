import { getTag } from "../check/index.js";
import { Branch, BranchKey, BranchTag, BranchTemplateFunction } from "../types/index.js";
import fn from "./new/function.js";

/**
 * @deprecated
 */
export default (template: unknown, parent: Branch, key: BranchKey): Branch => {
  switch (getTag(template)) {
    case BranchTag.Function: {
      return fn(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Element: {
      return; // TODO : create component
    }
    case BranchTag.Fragment: {
      return; // TODO : create component
    }
    case BranchTag.Text: {
      return; // TODO : create component
    }
    case BranchTag.Root: {
      return; // TODO : create component
    }
    case BranchTag.Null: {
      return; // TODO : create component
    }
  }
};
