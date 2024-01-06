import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createComposable } from '../index.js';
import { __test__mount, __test__unmount } from './utils.js';

describe('composables unmounting', () => {
  beforeAll(async () => {
    const useGrandParent = createComposable('grand-parent', () => 0);
    const useParent = createComposable('parent', () => useGrandParent());
    const useChild1 = createComposable('child-1', () => {
      useGrandParent();
      useParent();
    });
    const useChild2 = createComposable('child-2', () => {
      useParent();
    });
    const useChild3 = createComposable('child-3', () => {
      useChild1();
      useParent();
    });

    const App = () => {
      useChild3();
      useChild2();

      return <></>;
    };

    await __test__mount(<App />);
  });

  afterAll(async () => {
    await __test__unmount();
  });

  it('should unmount composables in correct order (without throwing errors)', async () => {
    const callback = async () => {
      await __test__unmount(50);

      return true;
    };

    await expect(callback()).resolves.toBe(true);
  });
});
