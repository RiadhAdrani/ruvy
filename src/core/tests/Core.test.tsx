import { describe, it, expect, beforeEach, vitest } from 'vitest';
import { Core, createRouter, getSearchQuery, setEffect } from '../Core.js';

describe('Core', () => {
  let core: Core;

  beforeEach(() => {
    core = new Core();
    document.body.innerHTML = '';
  });

  it('should have a singleton', () => {
    expect(Core.singleton).toBeTruthy();
  });

  describe('constructor', () => {
    it('should create a state item store', () => {
      expect(core.store.items['state']).toBeTruthy();
    });

    it('should create an effect store', () => {
      expect(core.store.effects['effect']).toBeTruthy();
    });

    it('should assign the created value to the singleton', () => {
      expect(core).toStrictEqual(Core.singleton);
    });
  });

  describe('executeRoutine', () => {
    beforeEach(() => {
      core.fn = () => <div></div>;
      core.host = document.body;
    });

    it('should throw when callback is undefined', () => {
      core = new Core();

      expect(() => core.executeRoutine()).toThrow(
        'Unexpected Type: app callback is not a function.'
      );
    });

    it('should throw when host is undefined', () => {
      core = new Core();
      core.fn = () => <div></div>;

      expect(() => core.executeRoutine()).toThrow(
        'Unexpected Type: host element is not a Dom element.'
      );
    });

    it('should render tree in the host element', () => {
      core.executeRoutine(false);

      expect(core.current).toBeTruthy();
      expect(document.body.innerHTML).toBe('<div></div>');
    });

    it('should reset shouldUpdate variable', () => {
      core.shouldUpdate = true;
      core.executeRoutine(false);

      expect(core.shouldUpdate).toBe(false);
    });

    it('should update tree', () => {
      let children = 1;

      core.fn = () => <div>{children}</div>;
      core.host = document.body;
      core.executeRoutine(false);

      children = 2;

      core.executeRoutine();
      expect(document.body.innerHTML).toBe('<div>2</div>');
    });

    it('should execute effects', () => {
      const onMount = vitest.fn();
      setEffect(onMount, 'on-mount');
      core.executeRoutine(false);

      expect(onMount).toHaveBeenCalledTimes(1);
    });
  });

  describe('onStateUpdate', () => {
    beforeEach(() => {
      core.fn = () => <div></div>;
      core.host = document.body;
      core.executeRoutine(false);
    });

    it('should schedule a execution routine', () => {
      core.executeRoutine = vitest.fn(core.executeRoutine);
      core.onStateUpdate();

      expect(core.executeRoutine).toHaveBeenCalledTimes(1);
    });

    it('should not launch an execution routine when batched', () => {
      core.executeRoutine = vitest.fn(core.executeRoutine);

      core.batchContext.use(() => {
        core.onStateUpdate();
      }, true);

      expect(core.shouldUpdate).toBe(true);
      expect(core.executeRoutine).toHaveBeenCalledTimes(0);
    });
  });

  describe('getSearchQuery', () => {
    beforeEach(() => createRouter([], {}));

    it('should return an empty object', () => {
      expect(getSearchQuery()).toStrictEqual({});
    });

    it('should return an object', () => {
      Core.singleton.router.push('/user?q=test');

      expect(getSearchQuery()).toStrictEqual({ q: 'test' });
    });

    it('should return an object with multiple keys', () => {
      Core.singleton.router.push('/user?q=test&n=3');

      expect(getSearchQuery()).toStrictEqual({ q: 'test', n: '3' });
    });

    it('should return an undefined key', () => {
      Core.singleton.router.push('/user?q=test&n=');

      expect(getSearchQuery()).toStrictEqual({ q: 'test', n: '' });
    });
  });
});
