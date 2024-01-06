import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { __test__mount, __test__unmount } from './utils.js';
import { generateHexId, wait } from '@/helpers/helpers.js';
import { useMemo, useState } from '../index.js';

describe('change position', () => {
  const id1 = generateHexId();
  const id2 = generateHexId();
  const id3 = generateHexId();
  const id4 = generateHexId();

  let fn: (v: boolean) => void;

  beforeAll(async () => {
    const App = () => {
      const [reverse, setReverse] = useState(false);

      fn = setReverse;

      const items = useMemo(() => {
        const arr = [id1, id2, id3, id4];

        if (reverse) {
          arr.reverse();
        }

        return arr;
      }, [reverse]);

      return (
        <>
          {items.map(id => (
            <div key={id}>{id}</div>
          ))}
        </>
      );
    };

    await __test__mount(<App />);
  });

  afterAll(async () => {
    await __test__unmount();
  });

  it('should update elements position', async () => {
    fn(true);

    await wait(10);

    expect(document.body.innerHTML).toBe(
      `<div>${id4}</div><div>${id3}</div><div>${id2}</div><div>${id1}</div>`
    );
  });

  it('should update elements position (revert)', async () => {
    fn(false);

    await wait(10);

    expect(document.body.innerHTML).toBe(
      `<div>${id1}</div><div>${id2}</div><div>${id3}</div><div>${id4}</div>`
    );
  });
});
