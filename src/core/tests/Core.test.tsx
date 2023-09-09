import { describe, it, expect, beforeEach, vitest } from 'vitest';
import { Core, createRouter, getSearchParams } from '../Core.js';
import { ActionType, BranchAction } from '../../branch/types.js';
import { initBranch } from '../../branch/utils/index.js';
import { Callback } from '@riadh-adrani/type-utils';

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
  });

  describe('onStateUpdate', () => {
    beforeEach(() => {
      core.fn = () => <div></div>;
      core.host = document.body;
      core.shouldUpdate = true;
      core.executeRoutine(false);
    });

    it('should schedule a execution routine', () => {
      core.executeRoutine = vitest.fn(core.executeRoutine);
      core.notifyStateUpdated();
      core.onStateUpdate();

      expect(core.executeRoutine).toHaveBeenCalledTimes(1);
    });

    it('should not launch an execution routine when batched', () => {
      core.executeRoutine = vitest.fn(core.executeRoutine);

      core.batchContext.use(() => {
        core.onStateUpdate();
      }, true);

      expect(core.executeRoutine).toHaveBeenCalledTimes(0);
    });

    it('should execute routine once', () => {
      core.executeRoutine = vitest.fn(core.executeRoutine);

      core.batch(() => {
        core.notifyStateUpdated();
        core.notifyStateUpdated();
        core.notifyStateUpdated();
      });

      expect(core.executeRoutine).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchQuery', () => {
    beforeEach(() => createRouter([], {}));

    it('should return an empty object', () => {
      expect(getSearchParams()).toStrictEqual({});
    });

    it('should return an object', () => {
      Core.singleton.router.push('/user?q=test');

      expect(getSearchParams()).toStrictEqual({ q: 'test' });
    });

    it('should return an object with multiple keys', () => {
      Core.singleton.router.push('/user?q=test&n=3');

      expect(getSearchParams()).toStrictEqual({ q: 'test', n: '3' });
    });

    it('should return an undefined key', () => {
      Core.singleton.router.push('/user?q=test&n=');

      expect(getSearchParams()).toStrictEqual({ q: 'test', n: '' });
    });
  });

  describe('queueAction', () => {
    const action: BranchAction = {
      branch: initBranch(),
      callback: () => 0,
      requestTime: Date.now(),
      type: ActionType.Render,
    };

    it('should add the action in the correct queue', () => {
      Core.singleton.queueAction(action);

      expect(Core.singleton.pendingActions).toStrictEqual({ [ActionType.Render]: [action] });
    });

    it('should create action queue for the first time', () => {
      Core.singleton.queueAction(action);

      expect(Core.singleton.pendingActions).toBeDefined();
    });
  });

  describe('commitAction', () => {
    let callback: Callback;
    let action: BranchAction;

    beforeEach(() => {
      callback = vitest.fn();

      action = {
        branch: initBranch(),
        callback,
        requestTime: Date.now(),
        type: ActionType.Render,
      };
    });

    it('should run callback', () => {
      Core.singleton.commitAction(action);

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should catch error', () => {
      action.callback = () => {
        throw 'error !';
      };

      Core.singleton.commitAction(action);

      expect(callback).not.toThrow('error !');
    });
  });

  describe('resetActions', () => {
    it('should reset action queues', () => {
      const action: BranchAction = {
        branch: initBranch(),
        callback: () => 0,
        requestTime: Date.now(),
        type: ActionType.Render,
      };

      Core.singleton.queueAction(action);
      Core.singleton.queueAction(action);

      Core.singleton.resetActions();

      expect(Core.singleton.pendingActions).toStrictEqual({});
    });
  });

  describe('commitActions', () => {
    let callback: Callback;
    let action: BranchAction;

    beforeEach(() => {
      callback = vitest.fn();

      action = {
        branch: initBranch(),
        callback,
        requestTime: Date.now(),
        type: ActionType.Render,
      };
    });

    it('should run actions', () => {
      Core.singleton.queueAction(action);

      Core.singleton.commitActions();

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should reset actions', () => {
      Core.singleton.queueAction(action);

      Core.singleton.commitActions();

      expect(Core.singleton.pendingActions).toStrictEqual({});
    });
  });
});
