import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';
import { __test__mount, __test__unmount } from './utils.js';
import { createComposable } from '../index.js';

describe('composable creation', () => {
  const order: Array<number> = [];

  const fn1 = vitest.fn(() => {
    order.push(1);

    return 1;
  });

  const fn2 = vitest.fn(() => {
    order.push(2);

    return 2;
  });

  const fn3 = vitest.fn(() => {
    order.push(3);

    return 3;
  });

  afterAll(async () => {
    await __test__unmount();
  });

  beforeAll(async () => {
    const useOne = createComposable('one', fn1);
    const useTwo = createComposable('two', fn2);
    const useThree = createComposable('three', fn3);

    const App = () => {
      const one = useOne();
      const two = useTwo();
      const three = useThree();

      return (
        <div>
          {one} {two} {three}
        </div>
      );
    };

    await __test__mount(<App />);
  });

  it('should handle composable in order of creation', () => {
    expect(order).toStrictEqual([1, 2, 3]);
  });

  it('should handle render without errors', () => {
    expect(document.body.innerHTML).toBe('<div>1 2 3</div>');
  });
});
