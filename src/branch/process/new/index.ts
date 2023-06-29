import { getTag } from '../../utils/index.js';
import { createFragmentTemplate } from '../../create/index.js';
import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFunction,
} from '../../types.js';
import fn from '../new/function.js';
import context from './context.js';
import element from './element.js';
import empty from './empty.js';
import fragment from './fragment.js';
import outlet from './outlet.js';
import portal, { PortalBranchType } from './portal.js';
import text from './text.js';

/**
 * create a brand new branch from a given template
 * @param template jsx, string, number...
 * @param parent parent branch
 * @param key branch key
 * @returns
 */
const createNewBranch = (template: unknown, parent: Branch, key: BranchKey): Branch => {
  const tag = getTag(template);

  switch (tag) {
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
    case BranchTag.Outlet: {
      return outlet(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Context: {
      return context(template as BranchTemplate, parent, key);
    }
    case BranchTag.Null: {
      return empty(parent, key);
    }
    case BranchTag.Portal: {
      return portal(template as BranchTemplate<PortalBranchType>, parent, key);
    }
    default: {
      throw '[Ruvy] Invalid template tag: this error should not happen !!!';
    }
  }
};

export default createNewBranch;
