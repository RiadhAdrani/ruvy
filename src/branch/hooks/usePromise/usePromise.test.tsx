import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { createJsxElement, createFragmentTemplate } from '../../create/index.js';
import { initBranch } from '../../utils/index.js';
import { usePromise } from './usePromise.js';
import { HookData, HookType, UsePromiseData, UsePromiseState } from '../../types.js';
import { handleComponent } from '../../index.js';
import { runAfter } from '@riadh-adrani/async-utils';

createFragmentTemplate;
createJsxElement;

describe('usePromise', () => {
  let callback = vitest.fn(async () => 0);

  beforeEach(() => {
    callback = vitest.fn(async () => 0);
  });

  it('should update hook state correctly', async () => {
    const branch = initBranch();

    const Child = () => {
      const [state, value] = usePromise(callback);

      expect(state).toBe<UsePromiseState>('pending');
      expect(value).toBe(undefined);

      return <div />;
    };

    const out = handleComponent(<Child />, undefined, branch, 0);

    expect(out.hooks[`${HookType.Promise}@0`]).toStrictEqual<HookData<UsePromiseData<number>>>({
      data: { callback, state: 'pending', value: undefined },
      initialData: { callback, state: 'pending', value: undefined },
      key: `${HookType.Promise}@0`,
      type: HookType.Promise,
    });

    await runAfter(() => 0, 50);

    expect(out.hooks[`${HookType.Promise}@0`]).toStrictEqual<HookData<UsePromiseData<number>>>({
      data: { callback, state: 'resolved', value: 0 },
      initialData: { callback, state: 'resolved', value: 0 },
      key: `${HookType.Promise}@0`,
      type: HookType.Promise,
    });

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should change state to rejected', async () => {
    callback = vitest.fn(async () => {
      throw 'error';
    });

    const branch = initBranch();

    const Child = () => {
      usePromise(callback);

      return <div />;
    };

    const out = handleComponent(<Child />, undefined, branch, 0);

    await runAfter(() => 0, 50);

    expect(out.hooks[`${HookType.Promise}@0`]).toStrictEqual<HookData<UsePromiseData<number>>>({
      data: { callback, state: 'rejected', value: undefined },
      initialData: { callback, state: 'rejected', value: undefined },
      key: `${HookType.Promise}@0`,
      type: HookType.Promise,
    });
  });

  it('should change state to refreshing', async () => {
    const branch = initBranch();

    let _refresh: () => void = () => 0;

    const Child = () => {
      const [, , refresh] = usePromise(callback);

      _refresh = refresh;

      return <div />;
    };

    const out = handleComponent(<Child />, undefined, branch, 0);

    // await the first fetch
    await runAfter(() => 0, 50);

    // refreshing
    _refresh();

    expect(out.hooks[`${HookType.Promise}@0`]).toStrictEqual<HookData<UsePromiseData<number>>>({
      data: { callback, state: 'refreshing', value: 0 },
      initialData: { callback, state: 'refreshing', value: 0 },
      key: `${HookType.Promise}@0`,
      type: HookType.Promise,
    });

    await runAfter(() => 0, 50);

    expect(out.hooks[`${HookType.Promise}@0`]).toStrictEqual<HookData<UsePromiseData<number>>>({
      data: { callback, state: 'resolved', value: 0 },
      initialData: { callback, state: 'resolved', value: 0 },
      key: `${HookType.Promise}@0`,
      type: HookType.Promise,
    });
  });
});
