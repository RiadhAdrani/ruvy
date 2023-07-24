import { describe, beforeEach, it, expect } from 'vitest';
import { mountApp } from '../Core.js';
import { getClosestAnchorParent } from '../utils.js';

describe('Core utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('getClosestAnchorParent', () => {
    it('should get the current element as anchor parent', () => {
      mountApp({ callback: () => <a id="el">anchor</a>, hostElement: document.body });

      const target = document.getElementById('el') as HTMLElement;

      expect(getClosestAnchorParent(target)?.outerHTML).toBe(`<a id="el">anchor</a>`);
    });

    it('should get parent as anchor parent', () => {
      mountApp({
        callback: () => (
          <a id="anchor">
            <div id="el">Click Me</div>
          </a>
        ),
        hostElement: document.body,
      });

      const target = document.getElementById('el') as HTMLElement;

      expect(getClosestAnchorParent(target)?.id).toBe('anchor');
    });

    it('should get great parent as anchor parent', () => {
      mountApp({
        callback: () => (
          <a id="anchor">
            <div>
              <div id="el">Click Me</div>
            </div>
          </a>
        ),
        hostElement: document.body,
      });

      const target = document.getElementById('el') as HTMLElement;

      expect(getClosestAnchorParent(target)?.id).toBe('anchor');
    });

    it('should return undefined when no anchor is found', () => {
      mountApp({
        callback: () => (
          <div id="anchor">
            <div>
              <div id="el">Click Me</div>
            </div>
          </div>
        ),
        hostElement: document.body,
      });

      const target = document.getElementById('el') as HTMLElement;

      expect(getClosestAnchorParent(target)).toBe(undefined);
    });
  });
});
