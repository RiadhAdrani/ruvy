import { getTag } from '../../utils/index.js';
import { createFragmentTemplate } from '../../create/index.js';
import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFunction,
} from '../../types.js';
import callableComponentHandler from '../../components/callable/callable.js';
import contextComponentHandler from '../../components/context/context.js';
import elementComponentHandler from '../../components/element/element.js';
import emptyComponentHandler from '../../components/empty/empty.js';
import fragmentComponentHandler from '../../components/fragment/fragment.js';
import outletComponentHandler from '../../components/outlet/outlet.js';
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
      return callableComponentHandler.create(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Element: {
      return elementComponentHandler.create(template as BranchTemplate<string>, parent, key);
    }
    case BranchTag.Fragment: {
      return fragmentComponentHandler.create(
        template as BranchTemplate<typeof createFragmentTemplate>,
        parent,
        key
      );
    }
    case BranchTag.Text: {
      return text(`${template}`, parent, key);
    }
    case BranchTag.Outlet: {
      return outletComponentHandler.create(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Context: {
      return contextComponentHandler.create(template as BranchTemplate, parent, key);
    }
    case BranchTag.Null: {
      return emptyComponentHandler.create(null, parent, key);
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
