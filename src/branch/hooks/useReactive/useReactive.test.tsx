import { describe, expect, it } from 'vitest';
import { useReactive } from './useReactive.js';
import { initBranch } from '../../utils/index.js';
import { HookType, handleComponent } from '../../index.js';
import { createJsxElement, createFragmentTemplate } from '../../create/index.js';

createFragmentTemplate;
createJsxElement;

describe('useReactive', () => {
  describe('dispatchUseReactive', () => {
    it('should add hook', () => {
      const branch = initBranch();

      const Child = () => {
        const count = useReactive({ value: 0 });

        return <div>{count.value}</div>;
      };

      const out = handleComponent(<Child />, undefined, branch, 0);

      expect(out.hooks[`${HookType.Reactive}@0`]).toStrictEqual({
        data: { value: 0 },
        initialData: { value: 0 },
        key: `${HookType.Reactive}@0`,
        type: HookType.Reactive,
      });
    });

    it('should throw when initial value is not of type object', () => {
      const branch = initBranch();

      const value = 0 as unknown as object;

      const Child = () => {
        useReactive(value);

        return <div></div>;
      };

      expect(() => handleComponent(<Child />, undefined, branch, 0)).toThrow(
        '[Ruvy] useReactive accepts only object values'
      );
    });
  });
});
