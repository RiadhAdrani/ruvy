import {
  Component,
  ComponentHandlerResult,
  ComponentStatus,
  ComponentSymbol,
  ComponentTag,
  ContextTemplate,
  EffectHook,
  ElementComponent,
  ElementTemplate,
  ExecutionContext,
  Fragment,
  FunctionComponent,
  FunctionTemplate,
  HookType,
  TaskType,
  NullComponent,
  Outlet,
  ParentComponent,
  Props,
  StateHook,
  Template,
  TextComponent,
  FragmentTemplate,
  JsxFragmentTemplate,
  Portal,
  PortalTemplate,
  OutletTemplate,
  FragmentComponent,
  ContextComponent,
  ComponentTasks,
  Composable,
} from '../../types.js';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vitest } from 'vitest';
import * as MOD from '@component/index.js';
import {
  compareElementProps,
  createContext,
  createRoot,
  filterDomProps,
  handleElement,
  handleFunction,
  handleNull,
  handleText,
  initComponentTasks,
  withHookContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
} from '../index.js';
import '@core/index.js';
import { omit } from '@riadh-adrani/obj-utils';
import { RuvyError } from '@/helpers/helpers.js';
import { Namespace, element } from '@riadh-adrani/domer';
import { createRouter, navigate, unmountRouter } from '@/router/router.js';
import { executeTasks, frameworkContext } from '@core/index.js';

const nonJsxComponents = [ComponentTag.Text, ComponentTag.Null, ComponentTag.Root];
const jsxComponents = Object.values(ComponentTag).filter(it => !nonJsxComponents.includes(it));

const nodeComponents = [ComponentTag.Element, ComponentTag.Text];
const nonNodeComponents = Object.values(ComponentTag).filter(it => !nodeComponents.includes(it));

const hostComponents = [ComponentTag.Element, ComponentTag.Portal, ComponentTag.Root];
const nonHostComponents = Object.values(ComponentTag).filter(it => !hostComponents.includes(it));

describe('component', () => {
  beforeAll(() => {
    frameworkContext.preventRequests = true;
  });

  afterAll(() => {
    frameworkContext.preventRequests = false;
  });

  unmountRouter();

  createRouter({
    base: '/test',
    routes: [
      {
        element: <Outlet />,
        children: [
          { path: '/', element: 'home', name: 'Home' },
          {
            path: '/users',
            name: 'Users',
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [{ path: '/:id', name: 'User', element: <div /> }],
          },
        ],
      },
    ],
  });

  afterAll(() => {
    unmountRouter();
  });

  let root = createRoot(document.body);

  let exCtx: ExecutionContext = {
    contexts: {},
    index: 0,
    key: 0,
    parent: root as unknown as ParentComponent,
    dom: {
      parent: root,
    },
  };

  beforeEach(() => {
    document.body.innerHTML = '';

    navigate('/');

    root = createRoot(document.body);

    exCtx = {
      contexts: {},
      index: 0,
      key: 0,
      parent: root as unknown as ParentComponent,
      dom: {
        parent: root,
      },
    };
  });

  describe('compareElementProps', () => {
    it('should not add any operation with no difference', () => {
      const oldProp = { class: '' };
      const newProp = { class: '' };

      expect(compareElementProps(oldProp, newProp)).toStrictEqual([]);
    });

    it('should add a "remove" operation', () => {
      const oldProp = { class: '' };
      const newProp = {};

      const expected = {
        key: 'class',
        operation: 'remove',
      };

      expect(compareElementProps(oldProp, newProp)).toStrictEqual([expected]);
    });

    it('should add an "update" operation', () => {
      const oldProp = { class: '' };
      const newProp = { class: 'test' };

      const expected = {
        key: 'class',
        operation: 'update',
        value: 'test',
      };

      expect(compareElementProps(oldProp, newProp)).toStrictEqual([expected]);
    });

    it('should add a "create" operation', () => {
      const oldProp = {};
      const newProp = { class: 'test' };

      const expected = {
        key: 'class',
        operation: 'create',
        value: 'test',
      };

      expect(compareElementProps(oldProp, newProp)).toStrictEqual([expected]);
    });
  });

  describe('filterDomProps', () => {
    it('should filter framework specific attributes', () => {
      const props = {
        if: 1,
        else: 1,
        'else-if': 1,
        switch: 1,
        case: 1,
        'case:default': 1,
        innerHTML: 1,
        ns: 1,
        children: 1,
        key: 1,
        ref: 1,
        class: 1,
      } as unknown as Props;

      expect(filterDomProps(props)).toStrictEqual({ class: 1 });
    });
  });

  describe('createContext', () => {
    const ctx = createContext<number>();

    it('should set a unique id', () => {
      expect(ctx.id).toBeTypeOf('string');
    });

    it('should create a provider function', () => {
      expect(ctx.Provider).toBeTypeOf('function');
    });

    it('should create a quick use function', () => {
      expect(ctx.use).toBeTypeOf('function');
    });

    it('should return the value of the context', () => {
      const value = withHookContext(
        {
          component: {
            tag: ComponentTag.Function,
            hooks: [{ type: HookType.Context, value: ctx }],
          } as unknown as FunctionComponent,
          ctx: {
            ...exCtx,
            contexts: {
              [ctx.id]: 10,
            },
          },
          tasks: initComponentTasks(),
        },
        () => ctx.use()
      );

      expect(value).toBe(10);
    });
  });

  describe('handleElement', () => {
    const ref = { value: undefined };

    const example = handleElement(
      (
        <div class="hello" test={1} ref={ref}>
          hello {'world'}
        </div>
      ) as unknown as ElementTemplate,
      undefined,
      root,
      0,
      exCtx
    );

    const innerHtmlExample = handleElement(
      (
        <div innerHTML="test">
          <img />
          <btn />
        </div>
      ) as unknown as ElementTemplate,
      undefined,
      root,
      0,
      exCtx
    );

    it('should not override old', () => {
      expect(exCtx).toStrictEqual({
        contexts: {},
        index: 0,
        key: 0,
        parent: root,
        dom: {
          parent: root,
        },
      });
    });

    describe('render phase', () => {
      it('should create element with type', () => {
        expect(example.component.type).toBe('div');
      });

      it('should create element with tag', () => {
        expect(example.component.tag).toBe(ComponentTag.Element);
      });

      it('should create element with parent', () => {
        expect(example.component.parent).toStrictEqual(root);
      });

      it('should create element with key', () => {
        expect(example.component.key).toBe(0);
      });

      it('should create element with mounting status', () => {
        expect(example.component.status).toBe(ComponentStatus.Mounting);
      });

      it('should create element with props', () => {
        expect(omit(example.component.props, 'children')).toStrictEqual({
          class: 'hello',
          test: 1,
          ref: {
            value: undefined,
          },
        });
      });

      it('should return children', () => {
        expect(example.children).toStrictEqual(['hello ', 'world']);
      });

      it('should add render task', () => {
        expect(example.tasks[TaskType.RenderElement].length).toBe(1);
      });

      it('should add render innerHTML task', () => {
        expect(innerHtmlExample.tasks[TaskType.RenderInnerHTML].length).toBe(1);
      });

      it('should create a set ref task', () => {
        expect(example.tasks[TaskType.RefElement].length).toBe(1);
      });

      it('should skip rendering children when innerHTML is a valid string', () => {
        expect(innerHtmlExample.children).toStrictEqual([]);
      });
    });

    describe('diff phase', () => {
      type SetupParams = { template?: unknown; newTemplate?: unknown; newCtx?: ExecutionContext };

      const setupDiffTest = ({
        template = <div></div>,
        newTemplate = <div></div>,
        newCtx = exCtx,
      }: SetupParams) => {
        const current = handleElement(
          template as unknown as ElementTemplate,
          undefined,
          root,
          0,
          exCtx
        );

        const result = handleElement(
          newTemplate as unknown as ElementTemplate,
          current.component,
          root,
          0,
          newCtx
        );

        return result;
      };

      it('should add an innerHTML update task', () => {
        const result = setupDiffTest({
          template: <div innerHTML="test-1" />,
          newTemplate: <div innerHTML="test-2" />,
        });

        expect(result.tasks[TaskType.RenderInnerHTML].length).toBe(1);
      });

      it('should not add an innerHTML update task when innerHTML is the same', () => {
        const result = setupDiffTest({
          template: <div innerHTML="test" />,
          newTemplate: <div innerHTML="test" />,
        });

        expect(result.tasks[TaskType.RenderInnerHTML].length).toBe(0);
      });

      it('should override props with new ones', () => {
        const result = setupDiffTest({
          template: <div class="hello" />,
          newTemplate: <div innerHTML="world" />,
        });

        expect(result.component.props).toStrictEqual({ children: [], innerHTML: 'world' });
      });

      it('should add a prop-update-task', () => {
        const result = setupDiffTest({
          template: <div class="hello" />,
          newTemplate: <div class="world" />,
        });

        expect(result.tasks[TaskType.UpdateProps].length).toBe(1);
      });

      it('should not add a prop-update-task when there is no diff', () => {
        const result = setupDiffTest({
          template: <div class="hello" />,
          newTemplate: <div class="hello" />,
        });

        expect(result.tasks[TaskType.UpdateProps].length).toBe(0);
      });

      it('should create unref-task', () => {
        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div />,
        });

        expect(result.tasks[TaskType.UnrefEelement].length).toBe(1);
      });

      it('should not create unref-task when ref object is the same', () => {
        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div ref={ref} />,
        });

        expect(result.tasks[TaskType.UnrefEelement].length).toBe(0);
      });

      it('should create ref-task with new reference object', () => {
        const newRef = { value: undefined };

        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div ref={newRef} />,
        });

        expect(result.tasks[TaskType.RefElement].length).toBe(1);
      });
    });
  });

  describe('handleNull', () => {
    const res = handleNull(null, undefined, root, 0, exCtx);

    it('should create a component with null tag', () => {
      expect(res.component.tag).toBe(ComponentTag.Null);
    });

    it('should add key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should add correct status', () => {
      expect(res.component.status).toBe(ComponentStatus.Mounting);
    });

    it('should add correct parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should return empty children', () => {
      expect(res.children).toStrictEqual([]);
    });

    it('should return the same component upon update', () => {
      const up = handleNull(null, res.component, root, 0, exCtx);

      expect(up.component).toStrictEqual(res.component);
    });
  });

  describe('handleText', () => {
    let res = handleText('test', undefined, root, 0, exCtx);

    it('should not override old', () => {
      expect(exCtx).toStrictEqual({
        contexts: {},
        index: 0,
        key: 0,
        parent: root,
        dom: {
          parent: root,
        },
      });
    });

    describe('render', () => {
      it('should create a component with text tag', () => {
        expect(res.component.tag).toBe(ComponentTag.Text);
      });

      it('should add key', () => {
        expect(res.component.key).toBe(0);
      });

      it('should set parent', () => {
        expect(res.component.parent).toStrictEqual(root);
      });

      it('should set status', () => {
        expect(res.component.status).toStrictEqual(ComponentStatus.Mounting);
      });

      it('should set text', () => {
        expect(res.component.text).toStrictEqual('test');
      });

      it('should create a render task', () => {
        expect(res.tasks[TaskType.RenderText].length).toBe(1);
      });
    });

    describe('update', () => {
      beforeEach(() => {
        res = handleText('test', undefined, root, 0, exCtx);
      });

      it('should not update text when text is the same', () => {
        const upSame = handleText('test', res.component, root, 0, exCtx);

        expect(upSame.tasks[TaskType.UpdateText].length).toBe(0);
      });

      it('should update text', () => {
        const up = handleText('test-2', res.component, root, 0, exCtx);

        expect(up.component.text).toBe('test-2');
      });

      it('should create update task', () => {
        const up = handleText('test-3', res.component, root, 0, exCtx);

        expect(up.tasks[TaskType.UpdateText].length).toBe(1);
      });
    });
  });

  describe('handleFunction', () => {
    const Fn = vitest.fn(() => 0);

    const withHookContext = vitest.spyOn(MOD, 'withHookContext');

    const res = handleFunction(
      (<Fn if />) as unknown as FunctionTemplate,
      undefined,
      root,
      0,
      exCtx
    );

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set ctx', () => {
      expect(res.component.ctx).toStrictEqual(exCtx);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(Fn);
    });

    it('should set props', () => {
      expect(res.component.props).toStrictEqual({ children: [], if: true });
    });

    it('should set tag', () => {
      expect(res.component.tag).toBe(ComponentTag.Function);
    });

    it('should set hooks', () => {
      expect(res.component.hooks).toStrictEqual([]);
    });

    it('should call the function', () => {
      expect(Fn).toHaveBeenCalledOnce();
    });

    it('should return single child', () => {
      expect(res.children).toStrictEqual([0]);
    });

    it('should call the function within hook context', () => {
      expect(withHookContext).toHaveBeenCalledOnce();
    });

    it('should update props', () => {
      handleFunction((<Fn else />) as unknown as FunctionTemplate, res.component, root, 0, exCtx);

      expect(res.component.props).toStrictEqual({
        else: true,
        children: [],
      });
    });

    it('should update context', () => {
      const obj = createContext();

      const newCtx: ExecutionContext = {
        ...exCtx,
        contexts: {
          [obj.id]: 0,
        },
      };

      handleFunction((<Fn else />) as unknown as FunctionTemplate, res.component, root, 0, newCtx);

      expect(res.component.ctx).toStrictEqual(newCtx);
    });
  });

  describe('handleContext', () => {
    const value = {
      age: 100,
      name: 'test',
    };

    const obj = createContext();

    const template = createJsxElement(
      ComponentTag.Context,
      {
        value,
        ctx: obj,
      },
      [1, 2, 3]
    ) as unknown as ContextTemplate;

    const _exCtx = {
      ...exCtx,
      contexts: {
        [obj.id]: value,
      },
    };

    const res = MOD.handleContext(template, undefined, root, 0, _exCtx);

    it('should set tag', () => {
      expect(res.component.tag).toBe(ComponentTag.Context);
    });

    it('should set type', () => {
      expect(res.component.type).toBe(ComponentTag.Context);
    });

    it('should set status', () => {
      expect(res.component.status).toBe(ComponentStatus.Mounting);
    });

    it('should set props', () => {
      expect(res.component.props).toStrictEqual({ value, ctx: obj, children: [1, 2, 3] });
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set key', () => {
      expect(res.component.key).toStrictEqual(0);
    });

    it('should set children', () => {
      expect(res.component.children).toStrictEqual([]);
    });

    it('should return children', () => {
      expect(res.children).toStrictEqual([1, 2, 3]);
    });

    it('should add context to record with id', () => {
      expect(res.ctx.contexts).toStrictEqual({
        [obj.id]: value,
      });
    });
  });

  describe('handleFragment', () => {
    const frg = (
      <Fragment key={10}>
        {null}
        {0}
        {1}
      </Fragment>
    ) as unknown as FragmentTemplate;

    const res = MOD.handleFragment(frg, undefined, root, 0, exCtx);

    it('should set tag', () => {
      expect(res.component.tag).toBe(ComponentTag.Fragment);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(Fragment);
    });

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set props', () => {
      expect(res.component.props).toHaveProperty('key');
    });

    it('should set status', () => {
      expect(res.component.status).toStrictEqual(ComponentStatus.Mounting);
    });

    it('should return children as they are', () => {
      expect(res.children).toStrictEqual([null, 0, 1]);
    });

    it('should update and override old props', () => {
      const up = (<Fragment key={80} />) as unknown as FragmentTemplate;

      MOD.handleFragment(up, res.component, root, 0, exCtx);

      expect(res.component.props).toStrictEqual({
        children: [],
        key: 80,
      });
    });
  });

  describe('handleJsxFragment', () => {
    const frg = (
      <>
        {null}
        {0}
        {1}
      </>
    ) as unknown as JsxFragmentTemplate;

    const res = MOD.handleJsxFragment(frg, undefined, root, 0, exCtx);

    it('should set tag', () => {
      expect(res.component.tag).toBe(ComponentTag.JsxFragment);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(createJsxFragmentElement);
    });

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set status', () => {
      expect(res.component.status).toStrictEqual(ComponentStatus.Mounting);
    });

    it('should return children as they are', () => {
      expect(res.children).toStrictEqual([null, 0, 1]);
    });
  });

  describe('handlePortal', () => {
    const portal = (<Portal container={document.body} />) as unknown as PortalTemplate;

    const res = MOD.handlePortal(portal, undefined, root, 0, exCtx);

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set status', () => {
      expect(res.component.status).toStrictEqual(ComponentStatus.Mounting);
    });

    it('should set tag', () => {
      expect(res.component.tag).toStrictEqual(ComponentTag.Portal);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(Portal);
    });

    it('should set instance', () => {
      expect(res.component.instance).toStrictEqual(document.body);
    });

    it('should set props', () => {
      expect(res.component.props).toStrictEqual({
        container: document.body,
        children: [],
      });
    });

    it('should not update the same container', () => {
      const up = MOD.handlePortal(portal, res.component, root, 0, exCtx);

      expect(up.tasks[TaskType.UpdatePortalChildren].length).toBe(0);
    });

    it('should create a move children task when container changes', () => {
      const container = element('div');
      document.body.append(container);

      const portal = (<Portal container={container} />) as unknown as PortalTemplate;

      const up = MOD.handlePortal(portal, res.component, root, 0, exCtx);

      expect(up.tasks[TaskType.UpdatePortalChildren].length).toBe(1);
    });

    it('should update props', () => {
      const portal = (<Portal container={document.body} key={20} />) as unknown as PortalTemplate;

      MOD.handlePortal(portal, res.component, root, 0, exCtx);

      expect(res.component.props).toStrictEqual({
        key: 20,
        container: document.body,
        children: [],
      });
    });
  });

  describe('handleOutlet', () => {
    const outlet = (<Outlet key={10} />) as unknown as OutletTemplate;

    const res = MOD.handleOutlet(outlet, undefined, root, 0, exCtx);

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set status', () => {
      expect(res.component.status).toStrictEqual(ComponentStatus.Mounting);
    });

    it('should set tag', () => {
      expect(res.component.tag).toStrictEqual(ComponentTag.Outlet);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(Outlet);
    });

    it('should set props', () => {
      expect(res.component.props).toStrictEqual({
        key: 10,
        children: [],
      });
    });

    it('should set execution context', () => {
      expect(res.component.ctx.outletDepth).toStrictEqual(0);
    });

    it('should update outlet depth in ctx', () => {
      expect(res.ctx.outletDepth).toBe(0);
    });

    it('should update props', () => {
      const outlet = (<Outlet key={20} />) as unknown as OutletTemplate;

      MOD.handleOutlet(outlet, res.component, root, 0, exCtx);

      expect(res.component.props).toStrictEqual({
        key: 20,
        children: [],
      });
    });

    it('should get correct outlet component', () => {
      expect(res.children).toStrictEqual([<Outlet />]);
    });

    it('should get correct outlet component depth', () => {
      navigate('/users/123');

      const res = MOD.handleComponent(
        <Outlet />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      res.tasks[TaskType.RenderElement].forEach(it => {
        it.execute();
      });

      expect(document.body.innerHTML).toBe('<div></div>');
    });
  });

  describe('handleComponent', () => {
    it('should use correct handler (element)', () => {
      const res = MOD.handleComponent(
        <div />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Element);
    });

    it('should use correct handler (function)', () => {
      const Fn = () => <div />;

      const res = MOD.handleComponent(
        <Fn />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Function);
    });

    it('should use correct handler (context)', () => {
      const value = {
        age: 100,
        name: 'test',
      };

      const obj = createContext();

      const template = createJsxElement(
        ComponentTag.Context,
        {
          value,
          ctx: obj,
        },
        [1, 2, 3]
      ) as unknown as ContextTemplate;

      const res = MOD.handleComponent(
        template,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Context);
    });

    it('should use correct handler (null)', () => {
      const res = MOD.handleComponent(
        null,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Null);
    });

    it('should use correct handler (text)', () => {
      const res = MOD.handleComponent(
        'null',
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Text);
    });

    it('should use correct handler (portal)', () => {
      const res = MOD.handleComponent(
        <Portal container={document.body} />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Portal);
    });

    it('should use correct handler (fragment)', () => {
      const res = MOD.handleComponent(
        <Fragment />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Fragment);
    });

    it('should use correct handler (jsx fragment)', () => {
      const res = MOD.handleComponent(
        <></>,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.JsxFragment);
    });

    it('should use correct handler (outlet)', () => {
      const res = MOD.handleComponent(
        <Outlet />,
        undefined,
        root as unknown as ParentComponent,
        0,
        exCtx
      );

      expect(res.component.tag).toBe(ComponentTag.Outlet);
    });
  });

  describe('hooks', () => {
    let res: ComponentHandlerResult<FunctionComponent>;

    beforeEach(() => {
      const Comp = vitest.fn();

      res = handleFunction((<Comp />) as unknown as FunctionTemplate, undefined, root, 0, exCtx);
    });

    const withCtx = (callback: () => void) => {
      return withHookContext(res, () => {
        callback();

        return null;
      });
    };

    describe('useState', () => {
      it('should throw when called outside of context', () => {
        expect(() => useState(0)).toThrow();
      });

      it('should create a hook entry', () => {
        withHookContext(res, () => {
          useState(0);

          return 0;
        });

        const hook = res.component.hooks[0] as StateHook;

        expect(hook.type).toBe(HookType.State);
        expect(hook.value).toBe(0);
        expect(typeof hook.getValue).toBe('function');
        expect(typeof hook.setValue).toBe('function');
      });

      it('should return an array of [value,setter,getter]', () => {
        withHookContext(res, () => {
          const [value, , get] = useState(0);

          expect(value).toBe(0);
          expect(get()).toBe(0);

          return 0;
        });
      });

      it('should create a state with a callback', () => {
        withHookContext(res, () => {
          const [value] = useState(() => 0);

          expect(value).toBe(0);

          return 0;
        });
      });

      it('should throw when hook (@ index) is not found', () => {
        res.component.status = ComponentStatus.Mounted;

        const callback = () =>
          withHookContext(res, () => {
            useState(() => 0);

            return 0;
          });

        expect(callback).toThrow(
          new RuvyError('unexpected hook type : expected state but got something else.')
        );
      });

      it('should return updated state', () => {
        withHookContext(res, () => {
          return useState(0);
        });

        res.component.status = ComponentStatus.Mounted;

        const hook = res.component.hooks[0] as StateHook;

        hook.value = 10;

        withHookContext(res, () => {
          const [value] = useState(0);

          expect(value).toBe(10);

          return 0;
        });
      });

      it('should update state', () => {
        withHookContext(res, () => {
          const [, set, get] = useState(0);

          set(10);

          expect(get()).toBe(10);

          return null;
        });
      });

      it('should update state with a callback', () => {
        withHookContext(res, () => {
          const [, set, get] = useState(0);

          set(v => {
            return v + 5;
          });

          expect(get()).toBe(5);

          return null;
        });
      });

      it('should not update state when component is unmounted', () => {
        withHookContext(res, () => {
          const [, set, get] = useState(0);

          // simulate component unmounted
          res.component.status = ComponentStatus.Unmounted;

          set(10);

          expect(get()).toBe(0);

          return null;
        });
      });

      it('should not update state when component is unmounting', () => {
        withHookContext(res, () => {
          const [, set, get] = useState(0);

          // simulate component unmounting
          res.component.status = ComponentStatus.Unmounting;

          set(10);

          expect(get()).toBe(0);

          return null;
        });
      });
    });

    describe('useEffect', () => {
      let cleanup = vitest.fn();
      let effect = vitest.fn(() => cleanup);

      beforeEach(() => {
        cleanup = vitest.fn();
        effect = vitest.fn(() => cleanup);
      });

      it('should throw when called outside the hook context', () => {
        expect(() => useEffect(effect)).toThrow(
          new RuvyError('cannot call "useEffect" outisde of a functional component body.')
        );
      });

      it('should create a hook effect entry', () => {
        withCtx(() => {
          useEffect(effect);
        });

        expect(res.component.hooks[0]).toStrictEqual({
          type: HookType.Effect,
          deps: undefined,
          callback: effect,
        });
      });

      it('should push an effect task', () => {
        withCtx(() => {
          useEffect(effect);
        });

        expect(res.tasks[TaskType.RunEffect].length).toBe(1);
      });

      it('should throw when component is already mounted and hook is not found', () => {
        res.component.status = ComponentStatus.Mounted;

        expect(() =>
          withCtx(() => {
            useEffect(effect);
          })
        ).toThrow(new RuvyError('unexpected hook type : expected effect but got something else.'));
      });

      it('should not add effect task when dependencies does not change', () => {
        withCtx(() => {
          useEffect(effect);
        });

        // ? simulate component mounted
        res.component.status = ComponentStatus.Mounted;
        res.tasks = initComponentTasks();

        withCtx(() => {
          useEffect(effect);
        });

        expect(res.tasks[TaskType.RunEffect].length).toBe(0);
        expect(res.tasks[TaskType.RunEffectCleanup].length).toBe(0);
      });

      it('should add effect task and cleanup when dependencies change', () => {
        withCtx(() => {
          useEffect(effect);
        });

        // ? simulate component mounted
        res.component.status = ComponentStatus.Mounted;
        res.tasks = initComponentTasks();

        // ? simulate that the effect ran
        (res.component.hooks[0] as EffectHook).cleanup = cleanup;

        withCtx(() => {
          useEffect(effect, []);
        });

        expect(res.tasks[TaskType.RunEffect].length).toBe(1);
        expect(res.tasks[TaskType.RunEffectCleanup].length).toBe(1);
      });
    });

    describe('useMemo | useCallback', () => {
      let memoization = vitest.fn(() => 0);

      beforeEach(() => {
        memoization = vitest.fn(() => 0);
      });

      it('should throw when called outside the hook context', () => {
        expect(() => useMemo(memoization)).toThrow(
          new RuvyError('cannot call "useMemo" outisde of a functional component body.')
        );
      });

      it('should create a memo hook entry', () => {
        withCtx(() => {
          useMemo(memoization);
        });

        expect(res.component.hooks[0]).toStrictEqual({
          type: HookType.Memo,
          deps: undefined,
          value: 0,
        });
      });

      it('should run the callback', () => {
        withCtx(() => {
          useMemo(memoization);
        });

        expect(memoization).toHaveBeenCalledOnce();
      });

      it('should throw when component is already mounted and hook is not found', () => {
        res.component.status = ComponentStatus.Mounted;

        expect(() =>
          withCtx(() => {
            useMemo(memoization);
          })
        ).toThrow(new RuvyError('unexpected hook type : expected memo but got something else.'));
      });

      it('should not recompute when dependencies does not change', () => {
        withCtx(() => {
          useMemo(memoization);
        });

        // ? simulate component mounted
        res.component.status = ComponentStatus.Mounted;
        res.tasks = initComponentTasks();

        withCtx(() => {
          useMemo(memoization);
        });

        expect(memoization).toHaveBeenCalledTimes(1);
      });

      it('should recompute when dependencies change', () => {
        withCtx(() => {
          useMemo(memoization);
        });

        // ? simulate component mounted
        res.component.status = ComponentStatus.Mounted;
        res.tasks = initComponentTasks();

        withCtx(() => {
          useMemo(memoization, []);
        });

        expect(memoization).toHaveBeenCalledTimes(2);
      });
    });

    describe('useRef', () => {
      const value = { age: 10, name: 'test' };

      it('should throw when called outside the hook context', () => {
        expect(() => useRef(value)).toThrow(
          new RuvyError('cannot call "useRef" outisde of a functional component body.')
        );
      });

      it('should add a new hook entry', () => {
        withCtx(() => {
          useRef(value);
        });

        expect(res.component.hooks[0]).toStrictEqual({
          type: HookType.Ref,
          value: {
            value: value,
          },
        });
      });

      it('should return the object as ref', () => {
        withCtx(() => {
          const ref = useRef(value);

          expect(ref).toStrictEqual({ value });
        });
      });

      it('should throw when component is already mounted and hook is not found', () => {
        res.component.status = ComponentStatus.Mounted;

        expect(() =>
          withCtx(() => {
            useRef();
          })
        ).toThrow(new RuvyError('unexpected hook type : expected ref but got something else.'));
      });
    });

    describe('useContext', () => {
      const ctxObj = createContext();
      const noCtx = createContext();

      beforeEach(() => {
        exCtx.contexts = {
          [ctxObj.id]: 0,
        };
      });

      it('should throw when called outside the hook context', () => {
        expect(() => useContext(ctxObj)).toThrow(
          new RuvyError('cannot call "useContext" outisde of a functional component body.')
        );
      });

      it('should throw when target ctx is not found in execution context', () => {
        expect(() => {
          withCtx(() => {
            useContext(noCtx);
          });
        }).toThrow(new RuvyError('unable to find a context with the given object'));
      });

      it('should add a new hook entry', () => {
        withCtx(() => {
          useContext(ctxObj);
        });

        expect(res.component.hooks[0]).toStrictEqual({
          type: HookType.Context,
          value: ctxObj,
        });
      });

      it('should return the ctx value', () => {
        withCtx(() => {
          const v = useContext(ctxObj);

          expect(v).toStrictEqual(0);
        });
      });

      it('should throw when component is already mounted and hook is not found', () => {
        res.component.status = ComponentStatus.Mounted;

        expect(() =>
          withCtx(() => {
            useContext(ctxObj);
          })
        ).toThrow(new RuvyError('unexpected hook type : expected context but got something else.'));
      });

      it('should throw when called in a composable', () => {
        MOD.createComposable('ctx', () => {
          useContext(ctxObj);
        });

        const comp = MOD.getComposable('ctx');

        expect(() => MOD.handleComposable(comp)).toThrow(
          new RuvyError('cannot call "useContext" in a composable.')
        );
        MOD.unmountComposable('ctx');
      });
    });
  });

  describe('isJsxComponent', () => {
    it.each(nonJsxComponents)('should return false for non-jsx component', tag => {
      const comp = { tag } as Component;

      expect(MOD.isJsxComponent(comp)).toBe(false);
    });

    it.each(jsxComponents)('should return true for jsx component "%s"', tag => {
      const comp = { tag } as Component;

      expect(MOD.isJsxComponent(comp)).toBe(true);
    });
  });

  describe('isSwitchController', () => {
    it.each(nonJsxComponents)('should return false when component is not jsx', tag => {
      expect(MOD.isSwitchController({ tag } as Component)).toBe(false);
    });

    it.each(jsxComponents)(
      'should return false when jsx component does not contain switch property',
      tag => {
        expect(MOD.isSwitchController({ tag, props: {} } as Component)).toBe(false);
      }
    );

    it.each(jsxComponents)(
      'should return switch value when jsx component contains switch property',
      tag => {
        expect(
          MOD.isSwitchController({ tag, props: { switch: 'test' } } as Component)
        ).toStrictEqual({ value: 'test' });
      }
    );
  });

  describe('isNodeComponent', () => {
    it.each(nonNodeComponents)('should return false for non-node components', tag => {
      expect(MOD.isNodeComponent({ tag } as Component)).toBe(false);
    });

    it.each(nodeComponents)('should return true for node components', tag => {
      expect(MOD.isNodeComponent({ tag } as Component)).toBe(true);
    });
  });

  describe('isHostComponent', () => {
    it.each(nonHostComponents)('should return false for non-host components', tag => {
      expect(MOD.isHostComponent({ tag } as Component)).toBe(false);
    });

    it.each(hostComponents)('should return true for host components', tag => {
      expect(MOD.isHostComponent({ tag } as Component)).toBe(true);
    });
  });

  describe('getHostingComponent', () => {
    it('should throw when component is root', () => {
      expect(() => MOD.getHostingComponent(root)).toThrow(
        new RuvyError('unable to locate the parent node.')
      );
    });

    it('should return hosting parent', () => {
      const component: NullComponent = {
        tag: ComponentTag.Null,
        key: 0,
        parent: root,
        status: ComponentStatus.Mounted,
      };

      expect(MOD.getHostingComponent(component)).toStrictEqual(root);
    });

    it('should return hosting parent (deep)', () => {
      const parent: FunctionComponent = {
        children: [],
        hooks: [],
        key: 0,
        parent: root,
        props: {},
        status: ComponentStatus.Mounted,
        tag: ComponentTag.Function,
        type: vitest.fn(),
        ctx: exCtx,
      };

      const component: NullComponent = {
        tag: ComponentTag.Null,
        key: 0,
        parent,
        status: ComponentStatus.Mounted,
      };

      expect(MOD.getHostingComponent(component)).toStrictEqual(root);
    });
  });

  describe('unmount component', () => {
    it('should add unmount task', () => {
      const nil: NullComponent = {
        tag: ComponentTag.Null,
        parent: root,
        key: 0,
        status: ComponentStatus.Mounted,
      };

      const tasks = MOD.unmountComponentOrComposable(nil, {});

      expect(tasks[TaskType.UnmountComponent].length).toBe(1);
    });

    it('should unmount function component effects', () => {
      const cleanup = vitest.fn();
      const effect = vitest.fn(() => cleanup);

      const Fn = () => {
        useEffect(effect);

        return <div></div>;
      };

      const res = handleFunction(
        (<Fn />) as unknown as FunctionTemplate,
        undefined,
        root,
        0,
        exCtx
      );

      (res.component.hooks[0] as EffectHook).cleanup = cleanup;

      const unmount = MOD.unmountComponentOrComposable(res.component, {});

      expect(unmount[TaskType.RunEffectCleanup].length).toBe(1);
    });

    it('should not add effect task with no cleanup', () => {
      const cleanup = vitest.fn();
      const effect = vitest.fn(() => cleanup);

      const Fn = () => {
        useEffect(effect);

        return <div></div>;
      };

      const res = handleFunction(
        (<Fn />) as unknown as FunctionTemplate,
        undefined,
        root,
        0,
        exCtx
      );

      const unmount = MOD.unmountComponentOrComposable(res.component, {});

      expect(unmount[TaskType.RunEffectCleanup].length).toBe(0);
    });

    it('should unmount children recursively', () => {
      const elRes = handleElement(
        (<div></div>) as unknown as ElementTemplate,
        undefined,
        root,
        0,
        exCtx
      );
      const childRes = handleElement(
        (<img></img>) as unknown as ElementTemplate,
        undefined,
        root,
        0,
        exCtx
      );

      elRes.component.children = [childRes.component];

      const tasks = MOD.unmountComponentOrComposable(elRes.component, {});

      expect(tasks[TaskType.UnmountComponent].length).toBe(2);
    });
  });

  describe('isJsxTemplate', () => {
    it.each([null, undefined, 0, 'txt', false])('should false for primitive value "%s"', v => {
      expect(MOD.isJsxTemplate(v as Template)).toBe(false);
    });

    it('should return false for an array', () => {
      expect(MOD.isJsxTemplate([])).toBe(false);
    });

    it('should return false with missing "type"', () => {
      expect(MOD.isJsxTemplate({ props: {}, children: [], symbol: ComponentSymbol })).toBe(false);
    });

    it('should return false with missing "props"', () => {
      expect(MOD.isJsxTemplate({ type: 'div', children: [], symbol: ComponentSymbol })).toBe(false);
    });

    it('should return false with non-object "props"', () => {
      expect(
        MOD.isJsxTemplate({ type: 'div', props: 0, children: [], symbol: ComponentSymbol })
      ).toBe(false);
    });

    it('should return false with missing "children"', () => {
      expect(MOD.isJsxTemplate({ type: 'div', props: {}, symbol: ComponentSymbol })).toBe(false);
    });

    it('should return false with non-array "children"', () => {
      expect(
        MOD.isJsxTemplate({ type: 'div', props: {}, children: 0, symbol: ComponentSymbol })
      ).toBe(false);
    });

    it('should return false with missing "symbol"', () => {
      expect(MOD.isJsxTemplate({ type: 'div', props: {}, children: [] })).toBe(false);
    });

    it('should return true', () => {
      expect(
        MOD.isJsxTemplate({ type: 'div', props: {}, children: [], symbol: ComponentSymbol })
      ).toBe(true);
    });
  });

  describe('getTagFromTemplate', () => {
    const Fn = vitest.fn();

    const el = <div></div>;
    const fn = <Fn />;
    const ctx = createJsxElement(ComponentTag.Context, {}, []);
    const outlet = <Outlet />;
    const frg = <Fragment />;
    const jsxFrg = <></>;

    it.each([
      [el, ComponentTag.Element],
      [fn, ComponentTag.Function],
      [ctx, ComponentTag.Context],
      [outlet, ComponentTag.Outlet],
      [frg, ComponentTag.Fragment],
      [jsxFrg, ComponentTag.JsxFragment],
      [null, ComponentTag.Null],
      [undefined, ComponentTag.Null],
      ['txt', ComponentTag.Text],
      [2, ComponentTag.Text],
    ])('should return correct tag', (temp, tag) => {
      expect(MOD.getTagFromTemplate(temp)).toBe(tag);
    });
  });

  describe('computeKey', () => {
    it('should return index when not a jsx template', () => {
      expect(MOD.computeKey(null, 10)).toBe(10);
    });

    it('should return index when no key in jsx template', () => {
      expect(MOD.computeKey(<div />, 5)).toBe(5);
    });

    it('should return key of the jsx template', () => {
      expect(MOD.computeKey(<div key={3} />, 5)).toBe(3);
    });
  });

  describe('getPropFromTemplate', () => {
    it('should return false with no jsx template', () => {
      expect(MOD.getPropFromTemplate(null, 'key')).toBe(false);
    });

    it('should return false property is missing', () => {
      expect(MOD.getPropFromTemplate(<div />, 'key')).toBe(false);
    });

    it('should return value of prop', () => {
      expect(MOD.getPropFromTemplate(<div key={0} />, 'key')).toStrictEqual({ value: 0 });
    });
  });

  describe('computeChildrenMap', () => {
    it('should return empty record with null component', () => {
      expect(
        MOD.computeChildrenMap({
          tag: ComponentTag.Null,
          key: 0,
          parent: root,
          status: ComponentStatus.Mounted,
        })
      ).toStrictEqual({});
    });

    it('should return empty record with text component', () => {
      expect(
        MOD.computeChildrenMap({
          tag: ComponentTag.Text,
          text: 'test',
          key: 0,
          parent: root,
          status: ComponentStatus.Mounted,
          position: 0,
          domParent: root,
        })
      ).toStrictEqual({});
    });

    const component = handleElement(
      (<div></div>) as unknown as ElementTemplate,
      undefined,
      root,
      0,
      exCtx
    );

    const child0 = handleNull(null, undefined, component.component, 11, exCtx);
    const child1 = handleNull(null, undefined, component.component, 22, exCtx);
    const child2 = handleNull(null, undefined, component.component, 33, exCtx);

    component.component.children = [child0.component, child1.component, child2.component];

    const map = MOD.computeChildrenMap(component.component);

    it('should return a Map<Key,Child>', () => {
      expect(map).toStrictEqual({
        11: { component: child0.component, index: 0 },
        22: { component: child1.component, index: 1 },
        33: { component: child2.component, index: 2 },
      });
    });

    it('should set every child to unmounting', () => {
      Object.keys(map).forEach(key => {
        expect(map[key].component.status).toBe(ComponentStatus.Unmounting);
      });
    });
  });

  describe('processElementTemplateProps', () => {
    const fn = vitest.fn();

    const el = (
      <div
        tag="a"
        className="cls"
        class="c"
        class:on
        class:off={false}
        onClick={fn}
        href={{ name: 'User', params: { id: '123' } }}
      />
    ) as unknown as ElementTemplate;

    MOD.processElementTemplateProps(el, exCtx);

    it('should override tag', () => {
      expect(el.type).toBe('a');
    });

    it('should transform class props', () => {
      expect(el.props.class).toBe('c cls on');
    });

    it('should keep other props untouched', () => {
      expect(el.props.onClick).toStrictEqual(fn);
    });

    it('should default namespace to HTML', () => {
      expect(el.props.ns).toStrictEqual(Namespace.HTML);
    });

    it('should set namespace according to execution context', () => {
      const el = (<div />) as unknown as ElementTemplate;

      MOD.processElementTemplateProps(el, { ...exCtx, ns: Namespace.SVG });

      expect(el.props.ns).toStrictEqual(Namespace.SVG);
    });

    it('should transform "href" with <a> element', () => {
      expect(el.props.href).toBe('/test/users/123');
    });
  });

  describe('shouldRenderNewComponent', () => {
    const nil: NullComponent = {
      tag: ComponentTag.Null,
      parent: root,
      key: 0,
      status: ComponentStatus.Mounted,
    };

    const a: ElementComponent = {
      children: [],
      key: 0,
      parent: root,
      props: { ns: Namespace.HTML },
      status: ComponentStatus.Mounted,
      tag: ComponentTag.Element,
      type: 'a',
      domParent: root,
    };

    it('should return true when tags are different', () => {
      expect(MOD.shouldRenderNewComponent('txt', nil)).toBe(true);
    });

    it('should return false with same jsx type', () => {
      expect(MOD.shouldRenderNewComponent(<a />, a)).toBe(false);
    });

    it('should return true with different jsx type', () => {
      const Fn = vitest.fn();

      expect(MOD.shouldRenderNewComponent(<Fn />, a)).toBe(true);
    });

    it('should return true same jsx element type but different namespace', () => {
      expect(MOD.shouldRenderNewComponent(<a ns={Namespace.SVG} />, a)).toBe(true);
    });
  });

  describe('getClosestNodeComponent', () => {
    const anchor: ElementComponent = {
      children: [],
      key: 0,
      parent: root,
      props: { ns: Namespace.HTML },
      status: ComponentStatus.Mounted,
      tag: ComponentTag.Element,
      type: 'a',
      domParent: root,
    };

    const txt: TextComponent = {
      key: 0,
      parent: root,
      status: ComponentStatus.Mounted,
      tag: ComponentTag.Text,
      text: 'hello',
      position: 0,
      domParent: root,
    };

    const parent: FunctionComponent = {
      hooks: [],
      key: 0,
      parent: root,
      props: {},
      status: ComponentStatus.Mounting,
      tag: ComponentTag.Function,
      type: vitest.fn(),
      ctx: exCtx,
      children: [
        {
          hooks: [],
          key: 0,
          parent: root,
          props: {},
          status: ComponentStatus.Mounting,
          tag: ComponentTag.Function,
          type: vitest.fn(),
          children: [anchor],
          ctx: exCtx,
        },
        anchor,
        {
          hooks: [],
          key: 0,
          parent: root,
          props: {},
          status: ComponentStatus.Mounting,
          tag: ComponentTag.Function,
          type: vitest.fn(),
          children: [],
          ctx: exCtx,
        },
        txt,
        {
          hooks: [],
          key: 0,
          parent: root,
          props: {},
          status: ComponentStatus.Mounting,
          tag: ComponentTag.Function,
          type: vitest.fn(),
          ctx: exCtx,
          children: [
            {
              hooks: [],
              key: 0,
              parent: root,
              props: {},
              status: ComponentStatus.Mounting,
              tag: ComponentTag.Function,
              type: vitest.fn(),
              children: [txt, anchor],
              ctx: exCtx,
            },
          ],
        },
      ],
    };

    it('should return an empty array directly when component is not a parent', () => {
      const nil: NullComponent = {
        tag: ComponentTag.Null,
        parent: root,
        key: 0,
        status: ComponentStatus.Mounted,
      };

      expect(MOD.getClosestNodeComponents(nil)).toStrictEqual([]);
    });

    it('should return closest children from each child', () => {
      expect(MOD.getClosestNodeComponents(parent)).toStrictEqual([
        anchor,
        anchor,
        txt,
        txt,
        anchor,
      ]);
    });
  });

  describe('processChildren', () => {
    let res: ComponentHandlerResult<ParentComponent>;

    beforeEach(() => {
      res = {
        children: [],
        component: {
          tag: ComponentTag.Function,
          type: vitest.fn(),
          children: [],
          hooks: [],
          key: 0,
          parent: root,
          props: {},
          status: ComponentStatus.Mounting,
          ctx: exCtx,
        },
        ctx: exCtx,
        tasks: initComponentTasks(),
      };
    });

    describe('switch directive', () => {
      it('should throw when at least one child does not have a case/case:default prop', () => {
        const children = [null] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'missing "case" or "case:default" prop in the last element of a switch control component.'
          )
        );
      });

      it('should throw when case:default is not at the end', () => {
        const children = [
          <div case={'hello'} />,
          <div case:default />,
          <div case={'yes'} />,
        ] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError('missing "case" prop within a switch control component.')
        );
      });

      it('should throw when else co-exist with case', () => {
        const children = [<div case={'hello'} else />] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'cannot have an "else" or "else-if" directive within a "switch" control component'
          )
        );
      });

      it('should throw when else-if co-exist with case', () => {
        const children = [<div case={'hello'} else-if />] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'cannot have an "else" or "else-if" directive within a "switch" control component'
          )
        );
      });

      it('should nullify non-matched children', () => {
        const children = [
          <div case={'hello'} />,
          <div case />,
          <div case={'hey'} />,
          <div case:default />,
        ] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Null,
        ]);
      });

      it('should default to case:default', () => {
        const children = [
          <div case={'hello'} />,
          <div case={'world'} />,
          <div case={'test'} />,
          <div case:default />,
        ] as Array<Template>;

        res.component.props = { switch: true };
        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Element,
        ]);
      });
    });

    describe('if directive', () => {
      it('should throw when there is more than one conditional directive', () => {
        const children = [<div if else else-if />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'cannot have more than one conditional directive : "if" | "else" | "else-if"'
          )
        );
      });

      it('should throw when conditional sequence starts with else', () => {
        const children = [<div else />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError('cannot use "else" or "else-if" directives outside a conditional sequence')
        );
      });

      it('should throw when conditional sequence starts with else-if', () => {
        const children = [<div else-if />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError('cannot use "else" or "else-if" directives outside a conditional sequence')
        );
      });

      it('should throw when else-if come after an else', () => {
        const children = [<div if={false} />, <div else />, <div else-if />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError('cannot use "else" or "else-if" directives outside a conditional sequence')
        );
      });

      it('should nullify other component in sequence when condition is fulfilled (if)', () => {
        const children = [
          <div if />,
          <div else-if />,
          <div else-if />,
          <div else />,
        ] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Null,
        ]);
      });

      it('should nullify other component in sequence when condition is fulfilled (else-if)', () => {
        const children = [
          <div if={false} />,
          <div else-if />,
          <div else-if />,
          <div else />,
        ] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Null,
        ]);
      });

      it('should nullify other component in sequence when condition is fulfilled (else)', () => {
        const children = [
          <div if={false} />,
          <div else-if={false} />,
          <div else-if={false} />,
          <div else />,
        ] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Element,
        ]);
      });

      it('should handle multiple if sequences', () => {
        const children = [
          <div />,
          <div if={false} />,
          <div else />,
          <div if={false} />,
          <div else-if={false} />,
          <div else />,
          <div />,
          <div if={false} />,
          <div else-if />,
          <div else />,
        ] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const cmpTags = res.component.children.map(it => it.tag);

        expect(cmpTags).toStrictEqual([
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Null,
        ]);
      });
    });

    describe('children diffing', () => {
      it('should mount new children (first render)', () => {
        const children = [<div />, null, 'hello'] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        expect(
          res.tasks[TaskType.SetComponentMounted].map(it => (it.component as Component).tag)
        ).toStrictEqual([ComponentTag.Element, ComponentTag.Null, ComponentTag.Text]);
      });

      it('should throw when duplicate key is detected', () => {
        const children = [<div />, null, <img key={0} />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            `duplicate key "${0}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`
          )
        );
      });

      it('should not reorder when order did not change', () => {
        const children = [<div key={0} />, null, 'hello'] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        MOD.processChildren(res);

        expect(res.tasks[TaskType.ReorderElements].length).toBe(0);
      });

      it('should reorder when component position changed', () => {
        const children = [<div key={'id'} />, null, 'hello'] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const newChildren = [null, <div key={'id'} />, 'hello'] as Array<Template>;

        res.tasks = initComponentTasks();

        res.children = newChildren;

        MOD.processChildren(res);

        expect(res.tasks[TaskType.ReorderElements].length).not.toBe(0);
      });

      it('should change order in the parent component array', () => {
        const children = [<div key={'id'} />, null, 'hello'] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const newChildren = [null, <div key={'id'} />, 'hello'] as Array<Template>;

        res.tasks = initComponentTasks();
        res.children = newChildren;

        MOD.processChildren(res);

        expect(res.component.children.map(it => it.tag)).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Element,
          ComponentTag.Text,
        ]);
      });

      it('should remove excess children', () => {
        const children = [<div key={'id'} />, null, <span />, 'hello', <img />] as Array<Template>;

        res.children = children;
        MOD.processChildren(res);

        const newChildren = [null, 'hello', <div key={'id'} />] as Array<Template>;

        res.children = newChildren;
        MOD.processChildren(res);

        expect(res.component.children.map(it => it.tag)).toStrictEqual([
          ComponentTag.Null,
          ComponentTag.Text,
          ComponentTag.Element,
        ]);
      });
    });
  });

  describe('computeNodeElementIndexInDOM', () => {
    const Fn = () => {
      return (
        <>
          <div></div>
          <img />
        </>
      );
    };

    const ctx = createContext();

    const template = (
      <div>
        text
        <>
          <p />
        </>
        <button>
          <span />
          <img />
        </button>
        <Fn />
        <ctx.Provider value={undefined}>
          <>text</>
        </ctx.Provider>
        text
      </div>
    );

    const res = MOD.handleComponent<ElementComponent>(
      template,
      undefined,
      root as unknown as ParentComponent,
      0,
      exCtx
    );

    const children = res.component.children;

    it('should assign direct node children their correct position', () => {
      const txt = children[0] as TextComponent;

      const position = MOD.computeNodeComponentIndexInDOM(txt, res.component);

      expect(position.index).toBe(0);
    });

    it('should assign correct position for nested children (fragment)', () => {
      const frg = children[1] as FragmentComponent;
      const txt = frg.children[0] as ElementComponent;

      const position = MOD.computeNodeComponentIndexInDOM(txt, res.component);

      expect(position.index).toBe(1);
    });

    it('should reset index for inner children with element component', () => {
      const btn = children[2] as ElementComponent;

      const span = btn.children[0] as ElementComponent;
      const img = btn.children[1] as ElementComponent;

      const position1 = MOD.computeNodeComponentIndexInDOM(span, btn);
      const position2 = MOD.computeNodeComponentIndexInDOM(img, btn);

      expect(position1.index).toBe(0);
      expect(position2.index).toBe(1);
    });

    it('should assign correct position for nested children (nested: function >  fragment)', () => {
      const fn = children[3] as FunctionComponent;

      const frg = fn.children[0] as FragmentComponent;

      const div = frg.children[0] as ElementComponent;
      const img = frg.children[1] as ElementComponent;

      const positon1 = MOD.computeNodeComponentIndexInDOM(div, res.component);
      const positon2 = MOD.computeNodeComponentIndexInDOM(img, res.component);

      expect(positon1.index).toBe(3);
      expect(positon2.index).toBe(4);
    });

    it('should assign correct position for nested children (nested: function > context > fragment)', () => {
      const fn = children[4] as FunctionComponent;
      const ctx = fn.children[0] as ContextComponent;
      const frg = ctx.children[0] as FragmentComponent;

      const div = frg.children[0] as ElementComponent;

      const position = MOD.computeNodeComponentIndexInDOM(div);

      expect(position.index).toBe(5);
    });

    it('should resume dom position correctly', () => {
      const txt = children[5] as TextComponent;

      const position = MOD.computeNodeComponentIndexInDOM(txt);

      expect(position.index).toBe(6);
    });
  });

  describe('cloneExecutionContext', () => {
    const old = exCtx;
    const newest = MOD.cloneExecutionContext(old);

    it('should create new object', () => {
      expect(old !== newest).toBe(true);
    });

    it('should have the same structure', () => {
      expect(old).toStrictEqual(newest);
    });

    it('should apply modification with callback', () => {
      const ctx = MOD.cloneExecutionContext(old, ctx => (ctx.contexts = { test: true }));

      expect(ctx.contexts).toStrictEqual({ test: true });
    });
  });

  describe('composables', () => {
    const cleanup = vitest.fn();
    const effect = vitest.fn(() => cleanup);

    const callback = vitest.fn(() => {
      const [count] = useState(0);

      const text = useMemo(() => (count > 1 ? 'clicks' : 'click'));

      useEffect(effect);

      return { count, text };
    });

    let composable: Composable<ReturnType<typeof callback>>;
    let use: () => ReturnType<typeof callback>;

    beforeAll(() => {
      use = MOD.createComposable('test', callback);

      composable = MOD.getComposable('test');
    });

    afterAll(() => {
      try {
        MOD.unmountComposable('test');
      } catch (e) {
        // already unmounted
      }
    });

    describe('createComposable', () => {
      it('should set name', () => {
        expect(composable.name).toStrictEqual('test');
      });

      it('should set id', () => {
        expect(typeof composable.id).toStrictEqual('string');
      });

      it('should init status', () => {
        expect(composable.status).toStrictEqual(ComponentStatus.Mounting);
      });

      it('should init value', () => {
        expect(composable.value).toStrictEqual(undefined);
      });

      it('should init subscribers', () => {
        expect(composable.subscribers).toStrictEqual([]);
      });

      it('should init callback', () => {
        expect(composable.callback).toStrictEqual(callback);
      });
    });

    describe('getComposable', () => {
      it('should throw when no composable is found with the given name', () => {
        expect(() => MOD.getComposable('nope')).toThrow(
          new RuvyError('unable to retrieve composable value, entry not found.')
        );
      });

      it('should return composable with given name', () => {
        expect(MOD.getComposable('test')).toStrictEqual(composable);
      });
    });

    describe('isComposable', () => {
      it('should return true when object does not contain a tag', () => {
        expect(MOD.isComposable(composable)).toBe(true);
      });

      it('should return false when object contains a tag', () => {
        const component: FunctionComponent = {
          tag: ComponentTag.Function,
          type: vitest.fn(),
          children: [],
          hooks: [],
          key: 0,
          parent: root,
          props: {},
          status: ComponentStatus.Mounting,
          ctx: exCtx,
        };

        expect(MOD.isComposable(component)).toBe(false);
      });
    });

    describe('handleComposable', () => {
      let tasks: ComponentTasks;

      beforeAll(() => {
        tasks = MOD.handleComposable(composable);
      });

      afterAll(() => {
        executeTasks(tasks);
      });

      it('should execute the callback', () => {
        expect(callback).toHaveBeenCalledOnce();
      });

      it('should set status to mounted', () => {
        expect(composable.status).toStrictEqual(ComponentStatus.Mounted);
      });

      it('should set value', () => {
        expect(composable.value).toStrictEqual({ count: 0, text: 'click' });
      });

      it('should deal with effects like components', () => {
        expect(tasks[TaskType.RunEffect].length).toBe(1);
      });
    });

    describe('useComposable', () => {
      let sub: Composable;

      beforeAll(() => {
        MOD.createComposable('sub', () => {
          const value = use();

          return value;
        });

        const composable = MOD.getComposable('sub');

        const tasks = MOD.handleComposable(composable);

        executeTasks(tasks);
      });

      beforeEach(() => {
        sub = MOD.getComposable('sub');
      });

      afterAll(() => {
        MOD.unmountComposable('sub');
      });

      it('should throw when used outside hook context', () => {
        expect(() => use()).toThrow(
          new RuvyError('cannot call "useComposable" outisde of a functional component body.')
        );
      });

      it('should add subscription to composable', () => {
        expect(composable.subscribers).toStrictEqual([sub]);
      });

      it('should return composable value', () => {
        const value = withHookContext(
          { component: sub, ctx: {} as ExecutionContext, tasks: initComponentTasks() },
          () => use()
        );

        expect(value).toStrictEqual({ count: 0, text: 'click' });
      });

      it('should throw when hook is not found', () => {
        const component: Composable = {
          callback: () => 0,
          hooks: [],
          id: '',
          name: 'err',
          status: ComponentStatus.Mounted,
          subscribers: [],
          value: 0,
          index: 10,
        };

        expect(() =>
          withHookContext(
            { component, ctx: {} as ExecutionContext, tasks: initComponentTasks() },
            () => use()
          )
        ).toThrow(
          new RuvyError('unexpected hook type : expected composable but got something else.')
        );
      });
    });

    describe('subscribeToComposable', () => {
      beforeEach(() => {
        composable.subscribers = [];
      });

      const prnt: FunctionComponent = {
        tag: ComponentTag.Function,
        type: vitest.fn(),
        children: [],
        hooks: [],
        key: 0,
        parent: root,
        props: {},
        status: ComponentStatus.Mounting,
        ctx: exCtx,
      };

      const cmpnt: FunctionComponent = {
        tag: ComponentTag.Function,
        type: vitest.fn(),
        children: [],
        hooks: [],
        key: 0,
        parent: prnt,
        props: {},
        status: ComponentStatus.Mounting,
        ctx: exCtx,
      };

      const cmpsbl: Composable = {
        callback: vitest.fn(),
        hooks: [],
        id: '',
        name: 'child',
        status: ComponentStatus.Mounted,
        subscribers: [],
        value: undefined,
        index: 55,
      };

      it('should push to subscribers', () => {
        MOD.subscribeToComposable('test', prnt);

        expect(composable.subscribers).toStrictEqual([prnt]);
      });

      it('should not push to subscribers when an ancestor is already there', () => {
        MOD.subscribeToComposable('test', prnt);

        MOD.subscribeToComposable('test', cmpnt);

        expect(composable.subscribers).toStrictEqual([prnt]);
      });

      it('should add composable to subscribers', () => {
        MOD.subscribeToComposable('test', cmpsbl);

        expect(composable.subscribers).toStrictEqual([cmpsbl]);
      });

      it('should not duplicate composable in subscribers', () => {
        MOD.subscribeToComposable('test', cmpsbl);
        MOD.subscribeToComposable('test', cmpsbl);

        expect(composable.subscribers).toStrictEqual([cmpsbl]);
      });

      describe('unsubscribeFromComposable', () => {
        it('should remove element from subscribers', () => {
          MOD.subscribeToComposable('test', cmpsbl);

          MOD.unsubscribeFromComposable('test', cmpsbl);

          expect(composable.subscribers).toStrictEqual([]);
        });
      });
    });

    describe('unmountComposable', () => {
      beforeAll(() => {
        const tasks = MOD.unmountComposable('test');
        executeTasks(tasks);
      });

      it('should remove composable from store', () => {
        expect(() => MOD.getComposable('test')).toThrow(
          new RuvyError('unable to retrieve composable value, entry not found.')
        );
      });

      it('should run tasks', () => {
        expect(cleanup).toHaveBeenCalledOnce();
      });
    });
  });
});
