import { beforeAll, describe, expect, it } from 'vitest';
import { __test__mount } from './utils.js';
import { element, insertNode } from '@riadh-adrani/domer';
import { useState, Portal } from '../index.js';
import { wait } from '@/helpers/helpers.js';

describe('portal', () => {
  beforeAll(async () => {
    const container = element('div');

    insertNode(container, document.body);

    const App = () => {
      const [bool, setBool] = useState(false);

      return (
        <>
          <button onClick={() => setBool(true)} />
          <Portal container={bool ? container : document.body}>
            <img />
            <img />
          </Portal>
        </>
      );
    };

    await __test__mount(<App />);
  });

  it('should render portal element correctly', () => {
    expect(document.body.innerHTML).toBe('<img><img><button></button><div></div>');
  });

  it('should teleport portal children to a new container', async () => {
    document.body.querySelector('button')?.click();

    await wait(10);

    expect(document.body.innerHTML).toBe('<button></button><div><img><img></div>');
  });
});
