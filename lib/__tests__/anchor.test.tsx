import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { __test__mount, __test__unmount } from './utils.js';

describe('anchor with href and no router', () => {
  beforeAll(async () => {
    const App = () => <a href="https://github.com/">GitHub</a>;

    await __test__mount(<App />);
  });

  afterAll(async () => {
    await __test__unmount();
  });

  it('should render anchor+href without router', () => {
    expect(document.body.innerHTML).toBe('<a href="https://github.com/">GitHub</a>');
  });
});
