import {
  Component,
  ComponentHandlerResult,
  ComponentStatus,
  ComponentTag,
  ContextTemplate,
  EffectHook,
  ElementTemplate,
  ExecutionContext,
  FunctionComponent,
  FunctionTemplate,
  HookType,
  MicroTaskType,
  Props,
  RootComponent,
  StateHook,
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

const nonJsxComponents = [ComponentTag.Text, ComponentTag.Null, ComponentTag.Root];
const jsxComponents = Object.values(ComponentTag).filter(it => !nonJsxComponents.includes(it));

const nodeComponents = [ComponentTag.Element, ComponentTag.Text];
const nonNodeComponents = Object.values(ComponentTag).filter(it => !nodeComponents.includes(it));

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
        expect(example.tasks[MicroTaskType.RenderElement].length).toBe(1);
      });

      it('should add render innerHTML task', () => {
        expect(innerHtmlExample.tasks[MicroTaskType.RenderInnerHTML].length).toBe(1);
      });

      it('should create a set ref task', () => {
        expect(example.tasks[MicroTaskType.RefElement].length).toBe(1);
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

        expect(result.tasks[MicroTaskType.RenderInnerHTML].length).toBe(1);
      });

      it('should not add an innerHTML update task when innerHTML is the same', () => {
        const result = setupDiffTest({
          template: <div innerHTML="test" />,
          newTemplate: <div innerHTML="test" />,
        });

        expect(result.tasks[MicroTaskType.RenderInnerHTML].length).toBe(0);
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

        expect(result.tasks[MicroTaskType.UpdateProps].length).toBe(1);
      });

      it('should not add a prop-update-task when there is no diff', () => {
        const result = setupDiffTest({
          template: <div class="hello" />,
          newTemplate: <div class="hello" />,
        });

        expect(result.tasks[MicroTaskType.UpdateProps].length).toBe(0);
      });

      it('should create unref-task', () => {
        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div />,
        });

        expect(result.tasks[MicroTaskType.UnrefEelement].length).toBe(1);
      });

      it('should not create unref-task when ref object is the same', () => {
        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div ref={ref} />,
        });

        expect(result.tasks[MicroTaskType.UnrefEelement].length).toBe(0);
      });

      it('should create ref-task with new reference object', () => {
        const newRef = { value: undefined };

        const result = setupDiffTest({
          template: <div ref={ref} />,
          newTemplate: <div ref={newRef} />,
        });

        expect(result.tasks[MicroTaskType.RefElement].length).toBe(1);
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
        expect(res.tasks[MicroTaskType.RenderText].length).toBe(1);
      });
    });

    describe('update', () => {
      beforeEach(() => {
        res = handleText('test', undefined, root, 0, ctx);
      });

      it('should not update text when text is the same', () => {
        const upSame = handleText('test', res.component, root, 0, ctx);

        expect(upSame.tasks[MicroTaskType.UpdateText].length).toBe(0);
      });

      it('should update text', () => {
        const up = handleText('test-2', res.component, root, 0, ctx);

        expect(up.component.text).toBe('test-2');

        it('should create update task', () => {
          expect(up.tasks[MicroTaskType.UpdateText].length).toBe(1);
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

        expect(res.tasks[MicroTaskType.RunEffect].length).toBe(1);
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

        expect(res.tasks[MicroTaskType.RunEffect].length).toBe(0);
        expect(res.tasks[MicroTaskType.RunEffectCleanup].length).toBe(0);
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

        expect(res.tasks[MicroTaskType.RunEffect].length).toBe(1);
        expect(res.tasks[MicroTaskType.RunEffectCleanup].length).toBe(1);
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
});
