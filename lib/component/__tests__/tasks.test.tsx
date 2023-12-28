import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { createRoot, handleComponent, handleElement } from '../index.js';
import {
  ComponentHandlerResult,
  ComponentStatus,
  ComponentTag,
  EffectHook,
  ElementComponent,
  ElementTemplate,
  ExecutionContext,
  FragmentComponent,
  FunctionComponent,
  FunctionTemplate,
  HookType,
  ParentComponent,
  Portal,
  PortalComponent,
  Task,
  TaskType,
  TextComponent,
} from '@/types.js';
import {
  createChangeElementPosition,
  createEffectCleanUpTask,
  createEffectTask,
  createElementPropsUpdateTask,
  createInnerHTMLTask,
  createMovePortalChildren,
  createRefElementTask,
  createRenderTask,
  createReorderChildrenTask,
  createTextTask,
  createUnmountComponentTask,
  createUnrefElementTask,
  createUpdateTextTask,
} from '../task.js';
import { RuvyError } from '@/helpers/helpers.js';
import { element } from '@riadh-adrani/domer';

describe('tasks', () => {
  let root = createRoot(document.body);

  let ctx: ExecutionContext = {
    contexts: {},
    dom: {
      parent: root,
      nextIndex: 0,
    },
  };

  beforeEach(() => {
    document.body.innerHTML = '';

    root = createRoot(document.body);

    ctx = {
      contexts: {},
      dom: {
        nextIndex: 0,
        parent: root,
      },
    };
  });

  describe('createRenderTask', () => {
    let el: ComponentHandlerResult<ElementComponent>;

    beforeEach(() => {
      el = handleElement((<div />) as unknown as ElementTemplate, undefined, root, 0, ctx);
    });

    it('should insert element in dom', () => {
      root.children = [el.component];

      const task = createRenderTask(el.component);

      task.execute();

      expect(document.body.innerHTML).toBe('<div></div>');
    });

    describe('createInnerHTML', () => {
      it('should throw when instance is not created', () => {
        const task = createInnerHTMLTask(el.component, 'test');

        expect(() => task.execute()).toThrow(
          new RuvyError('unable to set innerHTML, component is not yet mounted.')
        );
      });

      it('should modify innerHTML', () => {
        root.children = [el.component];

        createRenderTask(el.component).execute();

        const task = createInnerHTMLTask(el.component, 'test');

        task.execute();

        expect(document.body.innerHTML).toBe('<div>test</div>');
      });
    });

    describe('createElementPropsUpdateTask', () => {
      it('should throw when instance is not created', () => {
        const task = createElementPropsUpdateTask(el.component, []);

        expect(() => task.execute()).toThrow(
          new RuvyError('unable to update element, component is not yet mounted.')
        );
      });

      it('should create props', () => {
        root.children = [el.component];

        createRenderTask(el.component).execute();

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'class', operation: 'create', value: 'test' },
        ]);

        task.execute();

        expect(document.body.innerHTML).toBe('<div class="test"></div>');
      });

      it('should create event', () => {
        const value = vitest.fn();

        root.children = [el.component];

        createRenderTask(el.component).execute();

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'onClick:stop', operation: 'create', value },
        ]);

        task.execute();

        (el.component.instance as HTMLDivElement).click();

        expect(value).toHaveBeenCalledOnce();
      });

      it('should delete props', () => {
        root.children = [el.component];

        createRenderTask(el.component).execute();

        // simulate prop addition
        (el.component.instance as HTMLDivElement).classList.add('test');

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'class', operation: 'remove' },
        ]);

        task.execute();

        expect(document.body.innerHTML).toBe('<div></div>');
      });

      it('should remove event', () => {
        const value = vitest.fn();

        root.children = [el.component];

        createRenderTask(el.component).execute();

        const addTask = createElementPropsUpdateTask(el.component, [
          { key: 'onClick:stop', operation: 'create', value },
        ]);

        addTask.execute();

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'onClick:stop', operation: 'remove' },
        ]);

        task.execute();

        (el.component.instance as HTMLDivElement).click();

        expect(value).toHaveBeenCalledTimes(0);
      });

      it('should update props', () => {
        root.children = [el.component];

        createRenderTask(el.component).execute();

        // simulate prop addition
        (el.component.instance as HTMLDivElement).classList.add('test');

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'class', operation: 'update', value: 'hello' },
        ]);

        task.execute();

        expect(document.body.innerHTML).toBe('<div class="hello"></div>');
      });

      it('should update event', () => {
        const value = vitest.fn();
        const update = vitest.fn();

        root.children = [el.component];

        createRenderTask(el.component).execute();

        const addTask = createElementPropsUpdateTask(el.component, [
          { key: 'onClick', operation: 'create', value },
        ]);

        addTask.execute();

        const task = createElementPropsUpdateTask(el.component, [
          { key: 'onClick', operation: 'update', value: update },
        ]);

        task.execute();

        (el.component.instance as HTMLDivElement).click();

        expect(value).toHaveBeenCalledTimes(0);
        expect(update).toHaveBeenCalledTimes(1);
      });
    });

    describe('createRefElementTask', () => {
      const ref = { value: undefined };

      it('should throw when component is not mounted', () => {
        const task = createRefElementTask(el.component, ref);

        expect(() => task.execute()).toThrow(
          new RuvyError('unable to set reference, component is not yet mounted.')
        );
      });

      it('should set reference in value', () => {
        root.children = [el.component];

        const render = createRenderTask(el.component);
        render.execute();

        const addRef = createRefElementTask(el.component, ref);
        addRef.execute();

        expect(ref.value).toStrictEqual(el.component.instance);
      });
    });

    describe('unrefElementTask', () => {
      const ref = { value: undefined };

      it('should set reference in value to undefined', () => {
        root.children = [el.component];

        const render = createRenderTask(el.component);
        render.execute();

        const addRef = createRefElementTask(el.component, ref);
        addRef.execute();

        const unref = createUnrefElementTask(el.component, ref);
        unref.execute();

        expect(ref.value).toStrictEqual(undefined);
      });
    });

    describe('createUnmountComponent', () => {
      it('should throw when element is not mounted', () => {
        const task = createUnmountComponentTask(el.component, {});

        expect(() => task.execute()).toThrow(
          new RuvyError('unable to unmount node, component instance does not exist.')
        );
      });

      it('should unmount component', () => {
        root.children = [el.component];

        const render = createRenderTask(el.component);
        render.execute();

        const unmount = createUnmountComponentTask(el.component, {});
        unmount.execute();

        expect(document.body.innerHTML).toBe('');
      });

      it('should set component to unmounted', () => {
        root.children = [el.component];

        const render = createRenderTask(el.component);
        render.execute();

        const unmount = createUnmountComponentTask(el.component, {});
        unmount.execute();

        expect(el.component.status).toBe(ComponentStatus.Unmounted);
      });

      it('should not unmount component when parent will be unmounted', () => {
        root.children = [el.component];

        const render = createRenderTask(el.component);
        render.execute();

        const unmount = createUnmountComponentTask(el.component, { isHostParentUnmounting: true });
        unmount.execute();

        expect(document.body.innerHTML).toBe('<div></div>');
      });
    });
  });

  describe('createReorderChildrenTask', () => {
    const Temp = () => (
      <div>
        <>
          <img />
        </>
        <>
          <>
            <button />
          </>
        </>
        <span />
      </div>
    );

    let el: ComponentHandlerResult<FunctionComponent>;

    beforeEach(() => {
      el = handleComponent(
        (<Temp />) as unknown as FunctionTemplate,
        undefined,
        root as unknown as ParentComponent,
        0,
        ctx
      ) as ComponentHandlerResult<FunctionComponent>;

      root.children = [el.component];

      el.tasks[TaskType.RenderElement].forEach(it => it.execute());
    });

    it('should reorder components', () => {
      const div = el.component.children[0] as ElementComponent;

      const fr1 = div.children[0] as FragmentComponent;
      const fr2 = div.children[1] as FragmentComponent;

      const spn = div.children[2] as ElementComponent;

      div.children = [fr2, spn, fr1];

      const task = createReorderChildrenTask(div);
      task.execute();

      expect(document.body.innerHTML).toBe('<div><button></button><span></span><img></div>');
    });
  });

  describe('createTextTask', () => {
    let component: TextComponent;

    let task: Task;

    beforeEach(() => {
      component = {
        domParent: root,
        key: 0,
        parent: root,
        position: 0,
        status: ComponentStatus.Mounting,
        tag: ComponentTag.Text,
        text: 'test',
      };

      task = createTextTask(component);

      task.execute();
    });

    it('should set instance', () => {
      expect(component.instance instanceof Text).toBe(true);
    });

    it('should insert text', () => {
      expect(document.body.innerHTML).toBe('test');
    });

    describe('createUpdateTextNode', () => {
      it('should update text data', () => {
        const task = createUpdateTextTask(component, 'test-2');

        task.execute();

        expect(document.body.innerHTML).toBe('test-2');
      });
    });
  });

  describe('createEffectTask', () => {
    let component: FunctionComponent;
    let hook: EffectHook;

    let cleanup = vitest.fn();
    let callback = vitest.fn(() => cleanup);

    let task: Task;

    beforeEach(() => {
      component = {
        children: [],
        ctx,
        hooks: [],
        key: 0,
        parent: root,
        props: {},
        status: ComponentStatus.Mounted,
        tag: ComponentTag.Function,
        type: vitest.fn(),
      };

      cleanup = vitest.fn();
      callback = vitest.fn(() => cleanup);

      hook = {
        callback,
        deps: [],
        type: HookType.Effect,
      };

      component.hooks = [hook];

      task = createEffectTask(component, hook);

      task.execute();
    });

    it('should run callback', () => {
      expect(callback).toHaveBeenCalledOnce();
    });

    it('should store cleanup in the hook', () => {
      expect(hook.cleanup).toStrictEqual(cleanup);
    });

    describe('createEffectCleanupTask', () => {
      it('should run cleanup effect', () => {
        const clnTask = createEffectCleanUpTask(component, hook);

        clnTask.execute();

        expect(cleanup).toHaveBeenCalledOnce();
      });
    });
  });

  describe('createMovePortalChildren', () => {
    let cntnr: HTMLDivElement;
    let cntnr2: HTMLDivElement;

    let component: PortalComponent;

    beforeEach(() => {
      cntnr = element<HTMLDivElement>('div');
      cntnr2 = element<HTMLDivElement>('div');

      document.body.append(cntnr, cntnr2);

      const res = handleComponent<PortalComponent>(
        <Portal container={cntnr}>
          <p />
          <img />
        </Portal>,
        undefined,
        root as unknown as ParentComponent,
        0,
        ctx
      );

      // mount
      res.tasks[TaskType.RenderElement].forEach(it => it.execute());

      component = res.component;
    });

    it('should move element from old portal instance to the new one', () => {
      component.instance = cntnr2;

      const task = createMovePortalChildren(component);

      task.execute();

      expect(document.body.innerHTML).toBe('<div></div><div><p></p><img></div>');
    });
  });

  describe('createChangeElementPosition', () => {
    let parent: ElementComponent;

    let child0: ElementComponent;

    beforeEach(() => {
      const res = handleComponent<ElementComponent>(
        <div>
          <p />
          <img />
          <button />
        </div>,
        undefined,
        root as unknown as ParentComponent,
        0,
        ctx
      );

      // mount
      res.tasks[TaskType.RenderElement].forEach(it => it.execute());

      parent = res.component;

      child0 = parent.children[0] as ElementComponent;
    });

    it('should change element position', () => {
      const task = createChangeElementPosition(child0, 3);

      task.execute();

      expect(document.body.innerHTML).toBe('<div><img><button></button><p></p></div>');
    });
  });
});
