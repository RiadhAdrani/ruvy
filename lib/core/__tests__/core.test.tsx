import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vitest } from 'vitest';
import { createComposable } from '../../../docs/index.js';
import {
  __resetBuffer__,
  __setDidRender__,
  __resetPending__,
  collectUniqueRequesters,
  frameworkContext,
  isAncestorComponent,
  optimizeRequesters,
  __setState__,
  queueRequest,
  __pending__,
  __state__,
  __buffer__,
  processPending,
  unmountApp,
  __setUpdateDepth,
} from '../index.js';
import {
  Composable,
  FunctionComponent,
  HostComponent,
  ParentComponent,
  Requester,
} from '@/types.js';
import {
  createRoot,
  getComposable,
  handleComponent,
  subscribeToComposable,
  unmountComposable,
} from '@/component/index.js';
import { RuvyError, wait } from '@/helpers/helpers.js';

describe('collectUniqueRequesters', () => {
  const requesters: Array<Requester> = [];

  beforeAll(() => {
    frameworkContext.preventRequests = true;

    createComposable('1', () => 0);
    createComposable('2', () => 0);
    createComposable('3', () => 0);

    createComposable('4', () => 0);

    subscribeToComposable('1', getComposable('4'));

    ['1', '2', '3', '2', '1'].forEach(it => requesters.push(getComposable(it)));
  });

  afterAll(() => {
    frameworkContext.preventRequests = false;

    ['1', '2', '3'].forEach(it => unmountComposable(it));
  });

  it('should not return duplicate requesters', () => {
    const res = collectUniqueRequesters(requesters, []) as Array<Composable>;

    expect(res.map(it => it.name)).toStrictEqual(['1', '4', '2', '3']);
  });

  it('should collect composable subscribers', () => {
    const res = collectUniqueRequesters(requesters, []) as Array<Composable>;

    expect(res.map(it => it.name)).include('4');
  });
});

describe('isAncestorComponent', () => {
  const root = createRoot(document.body);

  const Children = () => <div />;

  const Parent = () => <Children />;

  const Fn = () => <Parent />;

  const parent = root as unknown as ParentComponent;

  const tree = handleComponent(<Fn />, undefined, parent, 0, {
    contexts: {},
    dom: { parent: parent as HostComponent },
    index: 0,
    key: 0,
    parent: parent,
  });

  const grndPrnt = tree.component as FunctionComponent;
  const prnt = grndPrnt.children[0] as FunctionComponent;
  const child = prnt.children[0] as FunctionComponent;

  it('should return false when component is root', () => {
    expect(isAncestorComponent(root, prnt)).toBe(false);
  });

  it('should return true for direct parent', () => {
    expect(isAncestorComponent(child, prnt)).toBe(true);
  });

  it('should return true for deep indirect parent', () => {
    expect(isAncestorComponent(child, grndPrnt)).toBe(true);
  });
});

describe('optimizeRequesters', () => {
  const requesters: Array<Requester> = [];

  let child: FunctionComponent;
  let prnt: FunctionComponent;
  let grndPrnt: FunctionComponent;

  let cmpbl1: Composable;
  let cmpbl2: Composable;
  let cmpbl3: Composable;

  beforeAll(() => {
    frameworkContext.preventRequests = true;

    const root = createRoot(document.body);

    const Children = () => <div />;

    const Parent = () => <Children />;

    const Fn = () => <Parent />;

    const parent = root as unknown as ParentComponent;

    const tree = handleComponent(<Fn />, undefined, parent, 0, {
      contexts: {},
      dom: { parent: parent as HostComponent },
      index: 0,
      key: 0,
      parent: parent,
    });

    grndPrnt = tree.component as FunctionComponent;
    prnt = grndPrnt.children[0] as FunctionComponent;
    child = prnt.children[0] as FunctionComponent;

    requesters.push(grndPrnt, prnt, child, child, grndPrnt, prnt);

    createComposable('1', () => 0);
    createComposable('2', () => 0);
    createComposable('3', () => 0);

    cmpbl1 = getComposable('1');
    cmpbl2 = getComposable('2');
    cmpbl3 = getComposable('3');

    subscribeToComposable('1', cmpbl2);
    subscribeToComposable('2', cmpbl3);

    requesters.push(cmpbl1, cmpbl2, cmpbl3, cmpbl2, cmpbl1);
  });

  afterAll(() => {
    frameworkContext.preventRequests = false;
  });

  it('should return optimized and toposorted requesters with no duplicate', () => {
    const optimized = optimizeRequesters(requesters);

    expect(optimized).toStrictEqual([cmpbl1, cmpbl2, cmpbl3, grndPrnt]);
  });
});

describe('queueRequeust', () => {
  beforeEach(() => {
    frameworkContext.preventRequestsProcessing = true;

    __setDidRender__(false);
    __resetBuffer__();
    __resetPending__();
    __setState__('idle');
  });

  afterEach(() => {
    frameworkContext.preventRequestsProcessing = false;

    __setDidRender__(false);
    __resetBuffer__();
    __resetPending__();
    __setState__('idle');
  });

  it('should push request to pending', () => {
    const root = createRoot(document.body);
    const child = <div />;

    queueRequest({ type: 'mount', root, child });

    expect(__pending__().length).toBe(1);
  });

  it('should set state to batching', () => {
    const root = createRoot(document.body);
    const child = <div />;

    queueRequest({ type: 'mount', root, child });

    expect(__state__()).toBe('batching');
  });

  it('should push request to buffer when state is processing', () => {
    const root = createRoot(document.body);
    const child = <div />;

    __setState__('processing');

    queueRequest({ type: 'mount', root, child });

    expect(__buffer__().length).toBe(1);
  });

  it('should not accept requests when unmounting', () => {
    const root = createRoot(document.body);
    const child = <div />;

    __setState__('unmounting');

    queueRequest({ type: 'mount', root, child });

    expect(__buffer__().length).toBe(0);
    expect(__pending__().length).toBe(0);
  });

  it('should process pendings', async () => {
    frameworkContext.preventRequestsProcessing = false;

    const root = createRoot(document.body);
    const Fn = vitest.fn(() => <div />);
    const child = <Fn />;

    queueRequest({ type: 'mount', root, child });

    await wait(10);

    expect(Fn).toHaveBeenCalledOnce();
  });
});

describe('processPending', () => {
  beforeEach(() => {
    __setDidRender__(false);
    __resetBuffer__();
    __resetPending__();
    __setState__('idle');
  });

  afterEach(() => {
    __setDidRender__(false);
    __resetBuffer__();
    __resetPending__();
    __setState__('idle');
  });

  it('should reset to idle when processing is complete', () => {
    __setState__('processing');

    processPending();

    expect(__state__()).toBe('idle');
  });

  it('should throw when app is already mounted', async () => {
    __setDidRender__(true);

    frameworkContext.preventRequestsProcessing = true;

    queueRequest({ type: 'mount', child: <div />, root: createRoot(document.body) });

    frameworkContext.preventRequestsProcessing = false;

    expect(() => processPending()).toThrow(
      new RuvyError('cannot mount application twice, try to unmount the current one first.')
    );
  });

  it('should throw when no application is already mounted', async () => {
    queueRequest({ type: 'unmount' });
    __setState__('unmounting');

    expect(() => processPending()).toThrow(new RuvyError('no application to be unmounted'));
  });

  it('should process bufferd requests after finishing the pending ones', async () => {
    __setState__('processing');

    // just in case
    unmountApp();

    queueRequest({ type: 'mount', child: <div />, root: createRoot(document.body) });

    processPending();

    expect(__buffer__()).toStrictEqual([]);
  });

  it('should throw when updateDeppth exceed 100', () => {
    __setUpdateDepth(101);

    expect(() => processPending()).toThrow(
      new RuvyError('infinite re-rendering detected: update depth exceeded 100.')
    );
  });
});
