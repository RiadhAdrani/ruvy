import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { useState } from '../index.js';
import { wait } from '@/helpers/helpers.js';
import { __test__mount, __test__unmount } from './utils.js';

describe('text', () => {
  beforeAll(async () => {
    const App = () => {
      const [count, setCount] = useState(0);

      return (
        <>
          <button onClick={() => setCount(count + 1)} class={count.toString()}></button>
        </>
      );
    };

    await __test__mount(<App />);
  });

  afterAll(async () => {
    await __test__unmount();
  });

  it('should render html element', () => {
    expect(document.body.innerHTML).toBe('<button class="0"></button>');
  });

  it('should update element attribute', async () => {
    const btn = document.querySelector('button');

    btn?.click();

    await wait(10);

    expect(document.body.innerHTML).toBe('<button class="1"></button>');
  });

  it('should update element event listeners', async () => {
    const btn = document.querySelector('button');

    btn?.click();

    await wait(10);

    expect(document.body.innerHTML).toBe('<button class="2"></button>');
  });
});
