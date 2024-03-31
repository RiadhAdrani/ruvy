import { afterEach, describe, expect, it } from 'vitest';
import { __test__mount, __test__unmount } from './utils.js';
import { ErrorBoundary, useErrorBoundary } from '../index.js';
import { wait } from '@/helpers/helpers.js';

describe('ErrorBoundary', () => {
  afterEach(async () => {
    await __test__unmount();
  });

  it('should render error boundary children', async () => {
    await __test__mount(
      <ErrorBoundary>
        <div>hello world</div>
      </ErrorBoundary>
    );

    expect(document.body.innerHTML).toBe('<div>hello world</div>');
  });

  it('should render fallback', async () => {
    const ErrorComponent = () => {
      throw new Error('test');
    };

    await __test__mount(
      <ErrorBoundary fallback={'fallback'}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(document.body.innerHTML).toBe('fallback');
  });

  it('should render fallback with hook', async () => {
    const Fallback = () => {
      const [error, recover] = useErrorBoundary();

      return <button onClick={recover}>{error}</button>;
    };

    const ErrorComponent = () => {
      throw new Error('test');
    };

    await __test__mount(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(document.body.innerHTML).toBe('<button>Error: test</button>');
  });

  it('should recover', async () => {
    let doThrow = true;

    const Fallback = () => {
      const [error, recover] = useErrorBoundary();

      return <button onClick={recover}>{error}</button>;
    };

    const ErrorComponent = () => {
      if (doThrow) {
        doThrow = false;
        throw new Error('test');
      }

      return <div>hello world</div>;
    };

    await __test__mount(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    document.querySelector('button')?.click();

    await wait(10);

    expect(document.body.innerHTML).toBe('<div>hello world</div>');
  });

  it('should keep fallback while error is not recovered from', async () => {
    const Fallback = () => {
      const [error, recover] = useErrorBoundary();

      return <button onClick={recover}>{error}</button>;
    };

    const ErrorComponent = () => {
      throw new Error('test');
    };

    await __test__mount(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    document.querySelector('button')?.click();

    await wait(10);

    expect(document.body.innerHTML).toBe('<button>Error: test</button>');
  });
});
