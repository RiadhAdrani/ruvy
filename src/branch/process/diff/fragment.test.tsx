/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import fragment from './fragment.js';
import { BranchTemplateFragment } from '../../types.js';

createFragmentTemplate;
createJsxElement;

describe('diff.fragment', () => {
  it('should just return children', () => {
    const template = <>hello world</>;

    expect(fragment(template as BranchTemplateFragment)).toStrictEqual(['hello world']);
  });
});
