import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { RawRoute, Route } from '../types.js';
import Router, { isNamedNavigationRequest } from '../Router.js';
import type { Callback } from '@riadh-adrani/type-utils';

const testId: RawRoute = { path: ':id', component: 'test-id', name: 'TestId' };
const test: RawRoute = { path: 'test', component: 'test', routes: [testId], name: 'Test' };

const userIdAbout: RawRoute = { path: 'about', component: 'user-about', name: 'UserAbout' };
const userId: RawRoute = {
  path: ':id',
  component: 'user-id',
  routes: [userIdAbout],
  name: 'UserId',
};
const user: RawRoute = { path: 'user', component: 'user', routes: [userId], name: 'User' };
const redirect: RawRoute = {
  path: 'redirect',
  component: 'empty',
  redirectTo: '/user',
  name: 'Redirect',
};

const root: RawRoute = {
  path: '/',
  component: 'home',
  routes: [test, user, redirect],
  name: 'Home',
};

describe('Router class', () => {
  let onChange: Callback;
  let router: Router;

  const setup = (routes = [root]) => {
    history.replaceState(undefined, '', '/');

    onChange = vitest.fn(() => 0);

    router = new Router(routes, {
      onStateChange: onChange,
    });
  };

  beforeEach(() => setup());

  it('should throw when base is invalid', () => {
    expect(() => new Router([], { onStateChange: () => 0, base: 'bad-base' })).toThrow(
      '[Ruvy] Unexpected Input : invalid base (bad-base), should start with "/"',
    );
  });

  it('should push state correctly', () => {
    router.push('/hello');

    expect(location.pathname).toBe('/hello');
    expect(history.state).toStrictEqual({ path: '/hello' });
    expect(history.length).toBe(2);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should replace state correctly', () => {
    router.replace('/hello2');

    expect(location.pathname).toBe('/hello2');
    expect(history.state).toStrictEqual({ path: '/hello2' });
    expect(history.length).toBe(2);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should get current path', () => {
    router.push('/test');

    expect(router.path).toBe('/test');
  });

  it('should get current path with base', () => {
    router.base = '/tester';
    router.push('/test');

    expect(router.path).toBe('/test');
  });

  it('should get route object', () => {
    router.push('/test');

    const route = router.route as Route;

    expect(route).toBeDefined();
    expect(route.isDynamic).toBe(false);
    expect(route.path).toBe('/test');
  });

  it('should get params', () => {
    router.push('/test/123');

    const params = router.params;

    expect(params).toStrictEqual({ id: '123' });
  });

  it('should get nearest route', () => {
    router.push('/test/123/about');

    const route = router.nearestRoute as Route;

    expect(route.path).toBe('/test/:id');
  });

  it('should get nearest route with 0 fragments', () => {
    const route = router.nearestRoute as Route;

    expect(route.path).toBe('/');
  });

  it('should get nearest route with wrong same-level route', () => {
    router.push('/user/123/me');

    const route = router.nearestRoute as Route;

    expect(route.path).toBe('/user/:id');
  });

  it('should get nearest route with overflow', () => {
    router.push('/user/123/me/123');

    const route = router.nearestRoute as Route;

    expect(route.path).toBe('/user/:id');
  });

  it('should get root component when depth is negative', () => {
    const component = router.getComponentByDepth(-1);

    expect(component).toBe('home');
  });

  it('should get current component', () => {
    const component = router.getComponentByDepth(0);

    expect(component).toBe('home');
  });

  it('should return undefined when current depth is overflowing', () => {
    const component = router.getComponentByDepth(1);

    expect(component).toBe(undefined);
  });

  it('should not trigger update when path is empty', () => {
    expect(router.shouldTriggerUpdate('')).toBe(false);
  });

  it('should not trigger update when request is 0', () => {
    expect(router.shouldTriggerUpdate(0)).toBe(false);
  });

  it('should not trigger update when path is equal', () => {
    expect(router.shouldTriggerUpdate('/')).toBe(false);
  });

  it('should not trigger update when path is equal with spaces', () => {
    expect(router.shouldTriggerUpdate(' / ')).toBe(false);
  });

  it('should trigger update', () => {
    expect(router.shouldTriggerUpdate(' /?query=test ')).toBe(true);
  });

  it('should trigger update', () => {
    router.push('/user/123');

    expect(router.shouldTriggerUpdate('/user/321')).toBe(true);
  });

  it('should trigger update', () => {
    expect(router.shouldTriggerUpdate(1)).toBe(true);
  });

  it('should trigger update', () => {
    expect(router.shouldTriggerUpdate(-1)).toBe(true);
  });

  it.each([
    ['/', true],
    ['/user', true],
    ['/test', true],
    ['/usa', true],
    ['www.google.com', false],
    ['http://localhost:5173/', false],
  ])('should determine if path (%s) is navigatable (%s)', (path, expected) => {
    expect(router.isNavigatable(path)).toBe(expected);
  });

  it('should get redirection path instead of original one', () => {
    expect(router.getCorrectPath('/redirect')).toBe('/user');
  });

  describe('Route.getCatchRouteByDepth', () => {
    it('should not return catch route if none is specified', () => {
      const route = router.getCatchRouteByDepth(5);

      expect(route).toBe(undefined);
    });

    it('should return the catch all route', () => {
      setup([root, { component: '*', path: '/**' }]);

      const route = router.getCatchRouteByDepth(5);

      expect(route?.component).toBe('*');
    });

    it('should return the local catch route', () => {
      setup([root, { component: '*', path: '/*' }]);

      router.push('/non-existing');

      const route = router.getCatchRouteByDepth(1);

      expect(route?.component).toBe('*');
    });

    it('should return the local catch route (2+ depth)', () => {
      setup([root, { component: 'not-found', path: '/user/*' }]);

      router.push('/user/not-found');

      const route = router.getCatchRouteByDepth(2);

      expect(route?.component).toBe('not-found');
    });

    it('should prioritize the dynamic route', () => {
      setup([root, { component: 'not-found', path: '/user/*' }]);

      router.push('/user/not-found');

      const component = router.getComponentByDepth(1);

      expect(component).toBe('user-id');
    });

    it('should priozitize the local catch route', () => {
      setup([root, { component: '*', path: '/*' }, { component: '**', path: '/**' }]);

      router.push('/non-existing');

      const route = router.getCatchRouteByDepth(1);

      expect(route?.component).toBe('*');
    });
  });

  describe('isNamedNavigationRequest', () => {
    it('should return true', () => {
      expect(isNamedNavigationRequest({ name: 'test' })).toBe(true);
    });

    it('should return false', () => {
      expect(isNamedNavigationRequest({ params: 'test' })).toBe(false);
    });
  });

  describe('transformNavigationRequest', () => {
    it('should return the number', () => {
      expect(router.transformNavigationRequest(1)).toBe(1);
    });

    it('should return the string', () => {
      expect(router.transformNavigationRequest('/')).toBe('/');
    });

    it('should transform the named request', () => {
      expect(router.transformNavigationRequest({ name: 'Home' })).toBe('/');
    });

    it('should transform the named request with params', () => {
      expect(router.transformNavigationRequest({ name: 'UserId', params: { id: 1 } })).toBe(
        '/user/1',
      );
    });

    it('should transform the named request with search params', () => {
      expect(router.transformNavigationRequest({ name: 'User', search: { id: 1 } })).toBe(
        '/user?id=1',
      );
    });

    it('should transform the named request with undefined params', () => {
      expect(router.transformNavigationRequest({ name: 'UserId' })).toBe('/user/undefined');
    });
  });
});
