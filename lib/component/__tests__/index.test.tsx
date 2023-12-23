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
  NodeComponent,
  NullComponent,
  Outlet,
  ParentComponent,
  Props,
  RootComponent,
  StateHook,
  Template,
  TextComponent,
} from '@/types.js';
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
import { Namespace } from '@riadh-adrani/domer';

const nonJsxComponents = [ComponentTag.Text, ComponentTag.Null, ComponentTag.Root];
const jsxComponents = Object.values(ComponentTag).filter(it => !nonJsxComponents.includes(it));

const nodeComponents = [ComponentTag.Element, ComponentTag.Text];
const nonNodeComponents = Object.values(ComponentTag).filter(it => !nodeComponents.includes(it));

const hostComponents = [ComponentTag.Element, ComponentTag.Portal, ComponentTag.Root];
const nonHostComponents = Object.values(ComponentTag).filter(it => !hostComponents.includes(it));

describe('component', () => {
  let ctx: ExecutionContext = {
    contexts: {},
  };

  let root: RootComponent = createRoot(document.body);

  beforeEach(() => {
    document.body.innerHTML = '';

    root = createRoot(document.body);
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
      {
        contexts: {},
      }
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
      {
        contexts: {},
      }
    );

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
      type SetupParams = { template?: unknown; newTemplate?: unknown };

      const setupDiffTest = ({
        template = <div></div>,
        newTemplate = <div></div>,
      }: SetupParams) => {
        const current = handleElement(template as unknown as ElementTemplate, undefined, root, 0, {
          contexts: {},
        });

        const result = handleElement(
          newTemplate as unknown as ElementTemplate,
          current.component,
          root,
          0,
          {
            contexts: {},
          }
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
    const res = handleNull(null, undefined, root, 0, ctx);

    it('should create a component with null tag', () => {
      expect(res.component.tag).toBe(ComponentTag.Null);
    });

    it('should add key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should add correct status', () => {
      expect(res.component.status).toBe(ComponentStatus.Mounting);
    });

    it('should add correct status', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should return empty children', () => {
      expect(res.children).toStrictEqual([]);
    });

    it('should return the same component upon update', () => {
      const up = handleNull(null, res.component, root, 0, ctx);

      expect(up.component).toStrictEqual(res.component);
    });
  });

  describe('handleText', () => {
    let res = handleText('test', undefined, root, 0, ctx);

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
        res = handleText('test', undefined, root, 0, ctx);
      });

      it('should not update text when text is the same', () => {
        const upSame = handleText('test', res.component, root, 0, ctx);

        expect(upSame.tasks[TaskType.UpdateText].length).toBe(0);
      });

      it('should update text', () => {
        const up = handleText('test-2', res.component, root, 0, ctx);

        expect(up.component.text).toBe('test-2');

        it('should create update task', () => {
          expect(up.tasks[TaskType.UpdateText].length).toBe(1);
        });
      });
    });
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
            hooks: [{ type: HookType.Context, value: ctx }],
          } as unknown as FunctionComponent,
          ctx: {
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

  describe('handleFunction', () => {
    const Fn = vitest.fn(() => 0);

    const withHookContext = vitest.spyOn(MOD, 'withHookContext');

    const res = handleFunction((<Fn if />) as unknown as FunctionTemplate, undefined, root, 0, ctx);

    it('should set key', () => {
      expect(res.component.key).toBe(0);
    });

    it('should set parent', () => {
      expect(res.component.parent).toStrictEqual(root);
    });

    it('should set type', () => {
      expect(res.component.type).toStrictEqual(Fn);
    });

    it('should set props', () => {
      expect(res.component.props).toStrictEqual({ children: [], if: true });
    });

    it('should set type', () => {
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
      handleFunction((<Fn else />) as unknown as FunctionTemplate, res.component, root, 0, ctx);

      expect(res.component.props).toStrictEqual({
        else: true,
        children: [],
      });
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

    const res = MOD.handleContext(template, undefined, root, 0, ctx);

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

  describe('hooks', () => {
    let res: ComponentHandlerResult<FunctionComponent>;

    beforeEach(() => {
      const Comp = vitest.fn();

      res = handleFunction((<Comp />) as unknown as FunctionTemplate, undefined, root, 0, ctx);
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

      beforeAll(() => {
        ctx = {
          contexts: {
            [ctxObj.id]: 0,
          },
        };
      });

      afterAll(() => {
        ctx = {
          contexts: {},
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

  describe('iHostComponent', () => {
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

  describe('getNodeIndex', () => {
    let node: NodeComponent;

    beforeEach(() => {
      node = {
        type: 'div',
        tag: ComponentTag.Element,
        children: [],
        key: 0,
        // ? but parent does not have children
        parent: root,
        props: {},
        status: ComponentStatus.Mounting,
      };
    });

    it('should return not found when component not found', () => {
      expect(MOD.getNodeIndex(node)).toStrictEqual({ found: false, index: -1 });
    });

    it('should return found (true) and index', () => {
      root.children.push(node);

      expect(MOD.getNodeIndex(node)).toStrictEqual({ found: true, index: 0 });
    });

    it('should return correct index', () => {
      const sibling0 = {
        key: 0,
        parent: root,
        tag: ComponentTag.Text,
      } as TextComponent;

      const sibling2 = {
        tag: ComponentTag.Null,
        parent: root,
      } as NullComponent;

      const sibling1 = {
        tag: ComponentTag.Function,
        children: [node],
        parent: root,
      } as FunctionComponent;

      node.parent = sibling1;

      root.children = [sibling0, sibling1, sibling2];

      expect(MOD.getNodeIndex(node)).toStrictEqual({ found: true, index: 0 });
    });

    it('should return correct index (deep)', () => {
      const sibling0 = {
        key: 0,
        parent: root,
        tag: ComponentTag.Element,
        props: {},
        type: 'div',
        status: ComponentStatus.Mounted,
        children: [],
      } as ElementComponent;

      const child0 = {
        key: 0,
        parent: sibling0,
        tag: ComponentTag.Text,
      } as TextComponent;

      // will be skipped
      sibling0.children = [child0];

      const sibling2 = {
        tag: ComponentTag.Null,
        parent: root,
      } as NullComponent;

      const sibling1 = {
        tag: ComponentTag.Function,
        children: [],
        parent: root,
        props: {},
        hooks: [],
        key: 0,
        status: ComponentStatus.Mounted,
        type: vitest.fn(),
      } as FunctionComponent;

      const child1 = {
        key: 0,
        parent: sibling1,
        tag: ComponentTag.Text,
      } as TextComponent;

      node.parent = sibling1;

      sibling1.children = [child1, node];

      root.children = [sibling0, sibling1, sibling2];

      expect(MOD.getNodeIndex(node)).toStrictEqual({ found: true, index: 1 });
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

      const tasks = MOD.unmountComponent(nil, {});

      expect(tasks[TaskType.UnmountComponent].length).toBe(1);
    });

    it('should unmount function component effects', () => {
      const cleanup = vitest.fn();
      const effect = vitest.fn(() => cleanup);

      const Fn = () => {
        useEffect(effect);

        return <div></div>;
      };

      const res = handleFunction((<Fn />) as unknown as FunctionTemplate, undefined, root, 0, ctx);

      (res.component.hooks[0] as EffectHook).cleanup = cleanup;

      const unmount = MOD.unmountComponent(res.component, {});

      expect(unmount[TaskType.RunEffectCleanup].length).toBe(1);
    });

    it('should not add effect task with no cleanup', () => {
      const cleanup = vitest.fn();
      const effect = vitest.fn(() => cleanup);

      const Fn = () => {
        useEffect(effect);

        return <div></div>;
      };

      const res = handleFunction((<Fn />) as unknown as FunctionTemplate, undefined, root, 0, ctx);

      const unmount = MOD.unmountComponent(res.component, {});

      expect(unmount[TaskType.RunEffectCleanup].length).toBe(0);
    });

    it('should unmount children recursively', () => {
      const elRes = handleElement(
        (<div></div>) as unknown as ElementTemplate,
        undefined,
        root,
        0,
        ctx
      );
      const childRes = handleElement(
        (<img></img>) as unknown as ElementTemplate,
        undefined,
        root,
        0,
        ctx
      );

      elRes.component.children = [childRes.component];

      const tasks = MOD.unmountComponent(elRes.component, {});

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
        })
      ).toStrictEqual({});
    });

    const component = handleElement(
      (<div></div>) as unknown as ElementTemplate,
      undefined,
      root,
      0,
      ctx
    );

    const child0 = handleNull(null, undefined, component.component, 11, ctx);
    const child1 = handleNull(null, undefined, component.component, 22, ctx);
    const child2 = handleNull(null, undefined, component.component, 33, ctx);

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
      <div tag="a" className="cls" class="c" class:on class:off={false} onClick={fn} href="/home" />
    ) as unknown as ElementTemplate;

    MOD.processElementTemplateProps(el, ctx);

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

      MOD.processElementTemplateProps(el, { contexts: {}, ns: Namespace.SVG });

      expect(el.props.ns).toStrictEqual(Namespace.SVG);
    });

    // TODO:
    it.todo('should transform "href" with <a> element', () => {
      expect(el.props.href).toBe('/home');
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
    };

    it('should return true when tags are different', () => {
      expect(MOD.shouldRenderNewComponent('txt', nil)).toBe(true);
    });

    it('should return false with same jsx type', () => {
      expect(MOD.shouldRenderNewComponent(<a />, a)).toBe(false);
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
    };

    const txt: TextComponent = {
      key: 0,
      parent: root,
      status: ComponentStatus.Mounted,
      tag: ComponentTag.Text,
      text: 'hello',
    };

    const parent: FunctionComponent = {
      hooks: [],
      key: 0,
      parent: root,
      props: {},
      status: ComponentStatus.Mounting,
      tag: ComponentTag.Function,
      type: vitest.fn(),
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
            },
          ],
        },
      ],
    };

    it('should return the component itself when it is a node component', () => {
      expect(MOD.getClosestNodeComponents(anchor)).toStrictEqual([anchor]);
    });

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
        },
        ctx,
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
          new RuvyError(
            'cannot use "else" outside a conditional sequence, which should start with "if"'
          )
        );
      });

      it('should throw when conditional sequence starts with else-if', () => {
        const children = [<div else-if />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'cannot use "else-if" outside a conditional sequence, which should start with "if"'
          )
        );
      });

      it('should throw when else-if come after an else', () => {
        const children = [<div if={false} />, <div else />, <div else-if />] as Array<Template>;

        res.children = children;

        expect(() => MOD.processChildren(res)).toThrow(
          new RuvyError(
            'cannot use "else-if" outside a conditional sequence, which should start with "if"'
          )
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

        expect(res.tasks[TaskType.SetComponentMounted].map(it => it.component.tag)).toStrictEqual([
          ComponentTag.Element,
          ComponentTag.Null,
          ComponentTag.Text,
        ]);
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

        const reorder = MOD.processChildren(res);

        expect(reorder).toBe(false);
      });

      it('should reorder when component position changed', () => {
        const children = [<div key={'id'} />, null, 'hello'] as Array<Template>;

        res.children = children;

        MOD.processChildren(res);

        const newChildren = [null, <div key={'id'} />, 'hello'] as Array<Template>;

        res.tasks = initComponentTasks();

        res.children = newChildren;

        const reorder = MOD.processChildren(res);

        expect(reorder).toBe(true);
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
});
