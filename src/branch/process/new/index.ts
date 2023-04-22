import { getTag } from "../../check/index.js";
import { createFragmentTemplate } from "../../create/index.js";
import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFunction,
} from "../../types/index.js";
import fn from "../new/function.js";
import element from "./element.js";
import empty from "./empty.js";
import fragment from "./fragment.js";
import text from "./text.js";

/**
 * create a brand new branch from a given template
 * @param template jsx, string, number...
 * @param parent parent branch
 * @param key branch key
 * @returns
 */
const createNewBranch = (template: unknown, parent: Branch, key: BranchKey): Branch => {
  switch (getTag(template)) {
    case BranchTag.Function: {
      return fn(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Element: {
      return element(template as BranchTemplate<string>, parent, key);
    }
    case BranchTag.Fragment: {
      return fragment(template as BranchTemplate<typeof createFragmentTemplate>, parent, key);
    }
    case BranchTag.Text: {
      return text(`${template}`, parent, key);
    }
    case BranchTag.Null: {
      return empty(parent, key);
    }
    default: {
      throw "Invalid template tag: this error should not happen !!!";
    }
  }
};

export default createNewBranch;
