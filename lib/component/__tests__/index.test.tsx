import {
  ComponentStatus,
  ComponentTag,
  ElementTemplate,
  MicroTaskType,
  Props,
  RootComponent,
} from '@/types.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { compareElementProps, createRoot, filterDomProps, handleElement } from '../index.js';
import '@core/index.js';
import { omit } from '@riadh-adrani/obj-utils';

describe('component', () => {
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

      it('should create a set mounted task', () => {
        expect(example.tasks[MicroTaskType.SetComponentMounted].length).toBe(1);
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

      it.todo('should add unmount children when innerHTML prop is added', () => {
        const result = setupDiffTest({
          template: (
            <div>
              <img /> <button />
            </div>
          ),
          newTemplate: <div innerHTML="test" />,
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
});
