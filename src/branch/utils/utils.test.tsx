import '../../core/core.js';

import { createFragmentTemplate } from '../create/index.js';

import { afterAll, beforeAll, beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getParentHostBranch,
  initBranch,
  isHostBranch,
  getCorrectKey,
  getHostBranchIndexFromHostParent,
  getClosestChildrenHostBranches,
  getOutletDepth,
  combineClasses,
  preprocessProps,
  findParentWith,
  postprocessProps,
  hasIfDirective,
  shouldTemplateWithIfDirectiveBeComputed,
  getPropertyFromTemplate,
  templateHasProperty,
  preprocessChildren,
  haveDuplicateKey,
  haveSameTagAndType,
  getTag,
  isValidTextChild,
  isValidTemplate,
  unmountBranch,
  isValidEventKey,
  getEventFlags,
} from './index.js';
import {
  ActionPriority,
  ActionType,
  Branch,
  BranchStatus,
  BranchSymbol,
  BranchTag,
  BranchTemplate,
  Namespace,
} from '../types.js';
import { createElement, injectNode } from '@riadh-adrani/dom-utils';
import { createTemplate } from '../create/index.js';
import root from '../components/root/root.js';
import { Outlet, Portal } from '../index.js';
import { omit } from '@riadh-adrani/obj-utils';
import { createRouter, mountApp } from '../../index.js';
import { Core, getCurrent } from '../../core/core.js';

describe('utils', () => {
  beforeEach(() => {
    getCurrent().resetActions();
  });

  describe('getNamespace', () => {
    it('shoult get namespace from props', () => {
      const branch = initBranch({ props: { ns: Namespace.MATH } });

      expect(getNamespace(branch)).toBe(Namespace.MATH);
    });

    it('shoult get default namespace', () => {
      const branch = initBranch({ props: {} });

      expect(getNamespace(branch)).toBe(Namespace.HTML);
    });
  });

  describe('getHtmlElementProps', () => {
    it('should collect html attributes', () => {
      const branch = initBranch({ props: { class: 'test', id: 'test' } });

      const attributes = getHtmlElementProps(branch);

      expect(attributes).toStrictEqual({ class: 'test', id: 'test' });
    });

    it('should skip ns, children, key and events', () => {
      const branch = initBranch({ props: { ns: 'test', children: [], key: 0, onClick: () => 0 } });

      const attributes = getHtmlElementProps(branch);

      expect(attributes).toStrictEqual({});
    });
  });

  describe('getHtmlElementEventListeners', () => {
    it('should collect html events', () => {
      const onClick = vitest.fn();
      const onInput = vitest.fn();

      const branch = initBranch({ props: { onClick, onInput } });

      const attributes = getHtmlElementEventListeners(branch);

      expect(attributes).toStrictEqual({ onClick, onInput });
    });

    it('should ignore non-functions', () => {
      const onClick = 'test';

      const branch = initBranch({ props: { onClick } });

      const attributes = getHtmlElementEventListeners(branch);

      expect(attributes).toStrictEqual({});
    });
  });

  describe('isHostBranch', () => {
    it.each([
      [BranchTag.Element, true],
      [BranchTag.JsxFragment, false],
      [BranchTag.Function, false],
      [BranchTag.Null, false],
      [BranchTag.Root, true],
      [BranchTag.Text, true],
      [BranchTag.Context, false],
      [BranchTag.Portal, true],
    ])('should determine if (%s) is host => (%s)', (tag, res) => {
      expect(isHostBranch(initBranch({ tag }))).toBe(res);
    });
  });

  describe('getElementHost', () => {
    const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

    it('should throw when host is not found', () => {
      expect(() => getParentHostBranch(initBranch())).toThrow(
        'Unable to locate the hosting branch.'
      );
    });

    it('should get root as host element', () => {
      const branch = initBranch({ type: 'div', parent: root });

      expect(getParentHostBranch(branch).instance).toStrictEqual(document.body);
    });

    it('should get the closest host element', () => {
      const parentInstance = createElement('div');

      injectNode(parentInstance, document.body);

      const parent = initBranch({
        type: 'div',
        parent: root,
        instance: parentInstance,
        tag: BranchTag.Element,
      });
      const branch = initBranch({ type: 'div', parent });

      expect(getParentHostBranch(branch).instance).toStrictEqual(parentInstance);
    });
  });

  describe('getCorrectKey', () => {
    it.each([
      [createTemplate('div', { key: 1 }, []), 3, 1],
      [createTemplate('div', {}, []), 1, 1],
      ['hello', 0, 0],
      [null, 0, 0],
    ])('should get correct key', (template, index, expected) => {
      expect(getCorrectKey(template, index)).toBe(expected);
    });
  });

  describe('getHostBranchIndexFromHostParent', () => {
    const Button = () => <button>Hello</button>;

    const Container = ({ children }: { children?: Array<unknown> }) => {
      return <>{children}</>;
    };

    it('should get index from direct parent', () => {
      const parent = root(document.body, <div />);

      const branch = parent.children[0];

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it('should get index when nested (+1)', () => {
      const parent = root(
        document.body,
        <Container>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[0];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it('should get index when nested (+1) and post branches', () => {
      const parent = root(
        document.body,
        <Container>
          <button />
          <div />
        </Container>
      );

      const branch = parent.children[0].children[0].children[0];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it('should get index when nested (+1) and offset', () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[1];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 1,
      });
    });

    it('should get index when nested (+1) and nested offset', () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            hello
            <div />
            <div />
            <div />
          </>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[2];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 5,
      });
    });
    it('should get index when nested (+1) and nested offset', () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[2];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 3,
      });
    });

    it('should get index when nested (+2) and nested offset', () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <>
            <button />
          </>
        </Container>
      );

      const branch = parent.children[0].children[0].children[2].children[0];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 3,
      });
    });

    it('should get index from correct parent host', () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <div>
            <button />
          </div>
        </Container>
      );

      const branch = parent.children[0].children[0].children[2].children[0];

      expect(branch.type).toBe('button');

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });
  });

  describe('getClosestHostBranches', () => {
    it('should get host branch directly', () => {
      const parent = root(document.body, <div></div>);

      const branch = parent.children[0];

      expect(getClosestChildrenHostBranches(branch)).toStrictEqual([branch]);
    });

    it('should get host branch directly nested', () => {
      const parent = root(
        document.body,
        <>
          <div key="div"></div>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestChildrenHostBranches(branch).map(item => item.key)).toStrictEqual(['div']);
    });

    it('should get host branch nested (1)', () => {
      const parent = root(
        document.body,
        <>
          <div key="div" />
          <>
            <div key="div1" />
            <div key="div2" />
          </>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestChildrenHostBranches(branch).map(item => item.key)).toStrictEqual([
        'div',
        'div1',
        'div2',
      ]);
    });

    it('should get host branch nested (2)', () => {
      const parent = root(
        document.body,
        <>
          <div key="div" />
          <>
            <div key="div1" />
            <div key="div2" />
            <>
              <div key="div3" />
              <div key="div4">
                <div />
                <div />
                <div />
              </div>
            </>
          </>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestChildrenHostBranches(branch).map(item => item.key)).toStrictEqual([
        'div',
        'div1',
        'div2',
        'div3',
        'div4',
      ]);
    });
  });

  describe('getOutletDepth', () => {
    it('should return 1 when parent is undefined', () => {
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(1);
    });

    it('should return 0 : parent > outlet', () => {
      const parent = initBranch();
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(1);
    });

    it('should return 2 : root > parent > outlet', () => {
      const root = initBranch();
      const parent = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: root });
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(2);
    });

    it('should return 2 : root > outlet > wrapper > outlet', () => {
      const root = initBranch();
      const parent = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: root });
      const outletWrapper = initBranch({ parent });
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: outletWrapper });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(2);
    });
  });

  describe('combineClasses', () => {
    it('should join strings', () => {
      expect(combineClasses('test-1', 'test-2')).toBe('test-1 test-2');
    });

    it('should join array and string', () => {
      expect(combineClasses(['test-1', 'test-3'], 'test-2')).toBe('test-1 test-3 test-2');
    });
  });

  describe('preprocessProps', () => {
    beforeAll(() => {
      createRouter([
        { path: '/', name: 'Home', component: 'home' },
        { path: '/user/:id', name: 'User', component: 'user' },
      ]);

      mountApp({ hostElement: document.body, callback: () => <div></div> });
    });

    afterAll(() => {
      new Core();

      document.body.innerHTML = '';
    });

    it('should transform event with true value to a function', () => {
      const processed = preprocessProps({ 'onClick:prevent': true });

      expect(typeof processed['onClick:prevent']).toStrictEqual('function');
    });

    it('should not transform a valid external link', () => {
      expect(preprocessProps({ href: 'https://github.com' })).toStrictEqual({
        href: 'https://github.com',
      });
    });

    it('should transform href with named request', () => {
      expect(preprocessProps({ href: { name: 'Home' } })).toStrictEqual({ href: '/' });
    });

    it('should transform href with dynamic named request', () => {
      expect(preprocessProps({ href: { name: 'User', params: { id: 1 } } })).toStrictEqual({
        href: '/user/1',
      });
      expect(preprocessProps({ href: { name: 'User' } })).toStrictEqual({
        href: '/user/undefined',
      });
    });

    it('should transform and remove props with prefix [:class]', () => {
      expect(preprocessProps({ 'class:test': true })).toStrictEqual({ class: 'test' });
    });

    it('should ignore props with [:class] prefix when their value is not true', () => {
      expect(preprocessProps({ 'class:test': false })).toStrictEqual({});
      expect(preprocessProps({ 'class:test': 1 })).toStrictEqual({});
    });

    it('should ignore prop [:class]', () => {
      expect(preprocessProps({ 'class:': false })).toStrictEqual({});
      expect(preprocessProps({ 'class:  ': false })).toStrictEqual({});
    });

    it('should combine classnames', () => {
      expect(
        preprocessProps({ 'class:test': true, 'class:done': true, class: 'tester' })
      ).toStrictEqual({
        class: 'tester test done',
      });
    });
  });

  describe('findParentWith', () => {
    it('should return undefined when parent is does not exist', () => {
      const branch = initBranch();

      expect(findParentWith(branch, it => (it.type as string) === 'div')).toBe(undefined);
    });

    it('should return the parent : 1st level', () => {
      const pBranch = initBranch({ type: 'div' });
      const branch = initBranch({ parent: pBranch });

      expect(findParentWith(branch, it => (it.type as string) === 'div')).toStrictEqual(pBranch);
    });

    it('should execute recursively', () => {
      const gpBranch = initBranch({ type: 'div' });
      const pBranch = initBranch({ parent: gpBranch });
      const branch = initBranch({ parent: pBranch });

      expect(findParentWith(branch, it => (it.type as string) === 'div')).toStrictEqual(gpBranch);
    });
  });

  describe('portprocessProps', () => {
    it('should assign svg namespace to branch of type "svg"', () => {
      const branch = initBranch({ type: 'svg' });

      postprocessProps(branch);

      expect(branch.props.ns).toBe(Namespace.SVG);
    });

    it('should assign svg namespace to children of "<svg/>"', () => {
      const parent = initBranch({ type: 'svg' });
      postprocessProps(parent);

      const child = initBranch({ type: 'a', parent });
      postprocessProps(child);

      expect(child.props.ns).toBe(Namespace.SVG);
    });
  });

  describe('hasIfDirective', () => {
    it.each([0, null, 'str', true, {}])('should return false for invalid templates', o => {
      expect(hasIfDirective(o)).toBe(false);
    });

    it('should return false for template with no if prop', () => {
      expect(hasIfDirective(createTemplate('div', {}, []))).toBe(false);
    });

    it('should return true for template with if prop', () => {
      expect(hasIfDirective(createTemplate('div', { if: true }, []))).toBe(true);
      expect(hasIfDirective(createTemplate('div', { if: false }, []))).toBe(true);
    });
  });

  describe('shouldTemplateWithIfDirectiveBeComputed', () => {
    it.each([0, null, 'str', true, {}, createTemplate('div', {}, [])])(
      'should throw when template does not have an if prop',
      o => {
        expect(() => shouldTemplateWithIfDirectiveBeComputed(o as BranchTemplate)).toThrow(
          '[Ruvy] the provided template does not contain an if directive'
        );
      }
    );

    it('should return the correct value of if prop', () => {
      expect(
        shouldTemplateWithIfDirectiveBeComputed(createTemplate('div', { if: false }, []))
      ).toBe(false);
      expect(shouldTemplateWithIfDirectiveBeComputed(createTemplate('div', { if: true }, []))).toBe(
        true
      );
      expect(shouldTemplateWithIfDirectiveBeComputed(createTemplate('div', { if: '' }, []))).toBe(
        true
      );
    });
  });

  describe('getPropertyFromTemplate', () => {
    it('should return undefined when a non-template is provided', () => {
      expect(getPropertyFromTemplate(0, 'class')).toBe(undefined);
    });

    it('should return undefined when property is not found', () => {
      expect(getPropertyFromTemplate(<div />, 'class')).toBe(undefined);
    });

    it('should return the value of the property', () => {
      expect(getPropertyFromTemplate(<div class="test" />, 'class')).toBe('test');
    });
  });

  describe('templateHasProperty', () => {
    it('should return false when a non-template is provided', () => {
      expect(templateHasProperty(0, 'class')).toBe(false);
    });

    it('should return false when property is not found', () => {
      expect(templateHasProperty(<div />, 'class')).toBe(false);
    });

    it('should return the value of the property', () => {
      expect(templateHasProperty(<div class="test" />, 'class')).toBe(true);
    });
  });

  describe('preprocessChildren', () => {
    describe('if directives', () => {
      it('should return template when if is not false', () => {
        expect(preprocessChildren([<div if />], initBranch())).toStrictEqual([<div if />]);
      });

      it('should return null when if is false', () => {
        expect(preprocessChildren([<div if={false} />], initBranch())).toStrictEqual([null]);
      });

      it('should throw when no "if" or "else-if" are used before "else-if"', () => {
        expect(() => preprocessChildren([<div else-if />], initBranch())).toThrow();
      });

      it('should throw when no "if" or "else-if" are used before "else"', () => {
        expect(() => preprocessChildren([<div else />], initBranch())).toThrow();
      });

      it('should return null when previous if is true', () => {
        expect(
          preprocessChildren([<div if={true} />, <div else-if={true} />], initBranch())
        ).toStrictEqual([<div if={true} />, null]);
      });

      it('should return template when previous if is false', () => {
        expect(
          preprocessChildren([<div if={false} />, <div else-if={true} />], initBranch())
        ).toStrictEqual([null, <div else-if={true} />]);
      });

      it('should return null when previous (if or else-if) is true', () => {
        expect(
          preprocessChildren(
            [<div if={false} />, <div else-if={true} />, <div else-if={true} />],
            initBranch()
          )
        ).toStrictEqual([null, <div else-if={true} />, null]);
      });

      it('should return null when previous (if or else-if) is true', () => {
        expect(
          preprocessChildren(
            [<div if={true} />, <div else-if={true} />, <div else />],
            initBranch()
          )
        ).toStrictEqual([<div if={true} />, null, null]);

        expect(
          preprocessChildren(
            [<div if={false} />, <div else-if={true} />, <div else />],
            initBranch()
          )
        ).toStrictEqual([null, <div else-if={true} />, null]);
      });

      it('should return template when none of the previous (if or else-if) is true', () => {
        expect(
          preprocessChildren(
            [<div if={false} />, <div else-if={false} />, <div else />],
            initBranch()
          )
        ).toStrictEqual([null, null, <div else />]);
      });

      it.each(
        [
          [<div else />],
          [<div />, <div else />],
          [<div if />, <div else />, <div else />],
          [<div else-if />],
          [<div if />, <div />, <div else />],
          [<div if />, <div />, <div else-if />],
          [<div else-if />, <div />, <div else-if />],
        ].map(it => [it])
      )('should throw : more cases', it => {
        expect(() => preprocessChildren(it, initBranch())).toThrow();
      });
    });

    describe('switch directive', () => {
      it('should throw when at least one children does not have a case or case:default directive', () => {
        const branch = initBranch({ props: { switch: true } });

        const children = [<div case />, <div />];

        expect(() => preprocessChildren(children, branch)).toThrow();
      });

      it('should throw when case:default directive is used before the end', () => {
        const branch = initBranch({ props: { switch: true } });

        const children = [<div case />, <div case:default />, <div case />];

        expect(() => preprocessChildren(children, branch)).toThrow();
      });

      it('should return first children with fullfilled case', () => {
        const branch = initBranch({ props: { switch: true } });

        const children = [<div case={false} />, <button case />, <img case />];

        expect(preprocessChildren(children, branch)).toStrictEqual([null, <button case />, null]);
      });

      it('should return fallback to "case:default"', () => {
        const branch = initBranch({ props: { switch: true } });

        const children = [<div case={false} />, <button case={false} />, <img case:default />];

        expect(preprocessChildren(children, branch)).toStrictEqual([
          null,
          null,
          <img case:default />,
        ]);
      });
    });
  });
});

describe('isBranchTemplate', () => {
  const template: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: 'div' };
  const templateNoChildren = omit(template, 'children');
  const templateNoProps = omit(template, 'props');
  const templateNoSymbol = omit(template, 'symbol');
  const templateNoType = omit(template, 'type');

  it.each([
    ['test', false],
    [1, false],
    [true, false],
    [{}, false],
    [templateNoChildren, false],
    [templateNoProps, false],
    [templateNoSymbol, false],
    [templateNoType, false],
    [template, true],
  ])('should determine if object is branch template', (obj, res) => {
    expect(isValidTemplate(obj)).toBe(res);
  });
});

describe('isBranchTemplateTextChild', () => {
  it.each([
    ['test', true],
    [1, true],
    [{}, true],
    [false, false],
    [true, false],
    [null, false],
    [undefined, false],
    [{ children: [], props: {}, symbol: BranchSymbol, type: 'div' }, false],
  ])('should determine if object (%s) is branch template', (obj, res) => {
    expect(isValidTextChild(obj)).toBe(res);
  });
});

describe('getTag', () => {
  const fc: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: vitest.fn() };
  const fr: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const div: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: 'div' };

  const portal = <Portal container={document.body} />;

  it.each([
    ['hello', BranchTag.Text],
    [1, BranchTag.Text],
    [{}, BranchTag.Text],
    [true, BranchTag.Null],
    [false, BranchTag.Null],
    [null, BranchTag.Null],
    [undefined, BranchTag.Null],
    [fc, BranchTag.Function],
    [fr, BranchTag.JsxFragment],
    [div, BranchTag.Element],
    [portal, BranchTag.Portal],
  ])('should return correct branch type (%s) => (%s)', (obj, expected) => {
    expect(getTag(obj)).toBe(expected);
  });
});

describe('haveSameTagAndType', () => {
  const fn = vitest.fn();
  const fn2 = vitest.fn();

  const fc: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: fn };
  const fc2: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: fn2 };
  const fcBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Function,
    type: fn,
    unmountedChildren: [],
  };

  const fr: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const fr2: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const frBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.JsxFragment,
    type: createFragmentTemplate,
    unmountedChildren: [],
  };

  const el: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: 'div' };
  const el2: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: 'button' };
  const elBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Element,
    type: 'div',
    unmountedChildren: [],
  };

  const text = 'text';
  const text2 = 'text-2';
  const textBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Text,
    type: BranchTag.Text,
    unmountedChildren: [],
  };

  const nullBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Null,
    type: BranchTag.Null,
    unmountedChildren: [],
  };

  it.each([
    // function
    [fcBranch, fc, true],
    [fcBranch, fc2, false],
    [fcBranch, fr, false],
    [fcBranch, el, false],
    [fcBranch, text, false],
    [fcBranch, text, false],
    [fcBranch, 1, false],
    [fcBranch, null, false],

    // fragment
    [frBranch, fc, false],
    [frBranch, fc2, false],
    [frBranch, fr, true],
    [frBranch, fr2, true],
    [frBranch, el, false],
    [frBranch, text, false],
    [frBranch, 'text', false],
    [frBranch, 1, false],
    [frBranch, null, false],

    // element
    [elBranch, fc, false],
    [elBranch, fc2, false],
    [elBranch, fr, false],
    [elBranch, fr2, false],
    [elBranch, el, true],
    [elBranch, el2, false],
    [elBranch, text, false],
    [elBranch, 'text', false],
    [elBranch, 1, false],
    [elBranch, null, false],

    // text
    [textBranch, fc, false],
    [textBranch, fc2, false],
    [textBranch, fr, false],
    [textBranch, fr2, false],
    [textBranch, el, false],
    [textBranch, el2, false],
    [textBranch, text, true],
    [textBranch, text2, true],
    [textBranch, 1, true],
    [textBranch, null, false],

    // null
    [nullBranch, fc, false],
    [nullBranch, fc2, false],
    [nullBranch, fr, false],
    [nullBranch, fr2, false],
    [nullBranch, el, false],
    [nullBranch, el2, false],
    [nullBranch, text, false],
    [nullBranch, text2, false],
    [nullBranch, 1, false],
    [nullBranch, null, true],
  ])('should compare branch and template : (%s) vs (%s) => (%s)', (branch, template, res) => {
    expect(haveSameTagAndType(branch, template)).toBe(res);
  });
});

describe('haveDuplicateKey', () => {
  it('should return false with index keys', () => {
    const children = [<div />, <div />, <div />];

    expect(haveDuplicateKey(children)).toBe(false);
  });

  it('should return true', () => {
    const children = [<div key="1" />, <div key="1" />, <div />];

    expect(haveDuplicateKey(children)).toBe(true);
  });

  it('should return false with string vs number', () => {
    const children = [<div key={1} />, <div key="1" />, <div />];

    expect(haveDuplicateKey(children)).toBe(false);
  });
});

describe('common', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    getCurrent().resetActions();
  });

  it('should be an object of {action type : number}', () => {
    expect(ActionPriority).toStrictEqual({
      [ActionType.Unmount]: 0,
      [ActionType.Render]: 1,
      [ActionType.RenderInnerHTML]: 2,
      [ActionType.Unmounted]: 3,
      [ActionType.RemoveBranch]: 4,
      [ActionType.Reorder]: 5,
      [ActionType.UpdatePortalChildren]: 6,
      [ActionType.UpdateProps]: 7,
      [ActionType.UpdateText]: 8,
      [ActionType.Mounted]: 9,
      [ActionType.Cleanup]: 10,
      [ActionType.Effect]: 11,
    });
  });

  describe('unmountBranch', () => {
    let branch: Branch;

    beforeEach(() => {
      branch = initBranch();
    });

    it('should change status to unmounting', () => {
      unmountBranch(branch);

      expect(branch.status).toBe(BranchStatus.Unmounting);
    });

    it.each([[BranchTag.Element], [BranchTag.Text]])(
      'should add an Unmount action to pendingActions if (%s)',
      tag => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        expect(branch.status).toBe(BranchStatus.Unmounting);

        const actions = getCurrent().pendingActions[ActionType.Unmount];

        expect(actions?.length).toBe(1);
      }
    );

    it.each([[BranchTag.JsxFragment], [BranchTag.Function], [BranchTag.Null]])(
      'should not add an Unmount action to pendingActions if (%s)',
      tag => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        const actions = getCurrent().pendingActions[ActionType.Unmounted];

        expect(actions).toBe(undefined);
      }
    );

    it('should unmount children recursively', () => {
      branch = initBranch();

      branch.children.push(...[initBranch(), initBranch()]);

      unmountBranch(branch);
    });
  });
});

describe('isValidEventKey', () => {
  it.each([
    'onClick',
    'onClick:prevent',
    'onClick:stop',
    'onClick:stop-prevent',
    'onClick:prevent-stop',
  ])('should accept event (%s)', key => {
    expect(isValidEventKey(key)).toBe(true);
  });

  it.each(['on:prevent', 'onClick:is', 'onClick:stop-prevent-is', 'onClick:stop-prevent-stop'])(
    'should refuse event (%s)',
    key => {
      expect(isValidEventKey(key)).toBe(false);
    }
  );
});

describe('getEventFlags', () => {
  it('should return prevent', () => {
    expect(getEventFlags('onClick:prevent')).toStrictEqual({ prevent: true });
  });

  it('should return stop', () => {
    expect(getEventFlags('onClick:stop')).toStrictEqual({ stop: true });
  });

  it('should return prevent & stop', () => {
    expect(getEventFlags('onClick:prevent-stop')).toStrictEqual({ prevent: true, stop: true });
    expect(getEventFlags('onClick:stop-prevent')).toStrictEqual({ prevent: true, stop: true });
  });
});
