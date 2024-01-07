import { afterAll, beforeAll, beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  __router__,
  createDestination,
  createRouter,
  getClosestAnchorParent,
  getParams,
  getPathname,
  getSearchParams,
  getTemplateByDepth,
  navigate,
  unmountRouter,
} from '../router.js';
import { element } from '@riadh-adrani/domer';
import { RawRoute, Router } from '@riadh-adrani/dom-router';
import { RuvyError } from '@/helpers/helpers.js';
import { Outlet } from '../../index.js';
import { Template } from '@/types.js';

const routes: Array<RawRoute<Template>> = [
  {
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      { path: '/', element: <div>Home</div>, name: 'Root' },
      { path: '/*', element: <div>not found</div>, name: 'Not Found' },
      {
        path: '/users',
        name: 'Users',
        element: (
          <div>
            <h1>Users</h1>
            <Outlet />
          </div>
        ),
        children: [
          { path: '', element: <div>Welcome Users</div> },
          { path: '/search', element: <div>Search Users</div>, name: 'UsersSearch' },
          {
            path: '/:id',
            element: <div>User Id</div>,
            name: 'User',
            children: [
              { path: '*', element: <div>Not Found in Users</div> },
              { path: '/options', element: <div>User options</div>, name: 'UserOptions' },
            ],
          },
        ],
      },
    ],
  },
];

describe('getClosestAnchorParent', () => {
  beforeAll(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('should return undefined if no anchor element is found', () => {
    expect(getClosestAnchorParent(document.body)).toBe(undefined);
  });

  it('should retrieve direct anchor element', () => {
    const btn = element('button');
    const a = element('a', {}, [btn]);

    document.body.append(a);

    expect(getClosestAnchorParent(btn)).toStrictEqual(a);
  });

  it('should retrieve closest anchor element', () => {
    const btn = element('button');
    const div = element('div', {}, [btn]);
    const a = element('a', {}, [div]);

    document.body.append(a);

    expect(getClosestAnchorParent(btn)).toStrictEqual(a);
  });
});

describe('createRouter', () => {
  it('should create a new router', () => {
    createRouter({ routes: [] });

    expect(__router__() instanceof Router).toBe(true);

    unmountRouter();
  });

  it('should throw when a router is already mounted', () => {
    createRouter({ routes: [] });

    expect(() => createRouter({ routes: [] })).toThrow(
      new RuvyError('another router was already mounted, please unmount it first')
    );

    unmountRouter();
  });
});

describe('unmountRouter', () => {
  it('should unmount router', () => {
    createRouter({ routes: [] });

    unmountRouter();

    expect(__router__()).toBe(undefined);
  });
});

describe('navigate', () => {
  it('should throw when no router is mounted', () => {
    expect(() => navigate('/')).toThrow(new RuvyError('a router is yet to be created'));
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes, base: '/base' });
    });

    afterAll(() => {
      unmountRouter();
    });

    it('should navigate to destination (path)', () => {
      navigate('/users');

      expect(location.pathname).toBe('/base/users');
    });

    it('should navigate to destination (named + params + query + hash)', () => {
      navigate({ name: 'User', params: { id: '123' }, query: { welcome: 'true' }, hash: 'first' });

      expect(location.href).toBe('http://localhost:3000/base/users/123?welcome=true#first');
    });

    it.skip('should navigate to destination (relative)', () => {
      navigate(-1);

      // ! spying does not work for some reason in jsdom
      const go = vitest.spyOn(history, 'go');

      expect(go).toHaveBeenCalledOnce();

      expect(location.pathname).toBe('/base');
    });
  });
});

describe('createDestination', () => {
  it('should return undefined when destination is of type number', () => {
    expect(createDestination(0)).toBe(undefined);
  });

  it('should throw when router is undefined', () => {
    expect(() => createDestination('/hello')).toThrow(
      new RuvyError('a router is yet to be created')
    );
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes, base: '/base' });
    });

    afterAll(() => {
      unmountRouter();
    });

    it('should return url as it is when it is external (not navigatable)', () => {
      expect(createDestination('https://github.com/')).toBe('https://github.com/');
    });

    it('should add base to url', () => {
      expect(createDestination('/')).toBe('/base/');
    });

    it('should create url with destination', () => {
      expect(
        createDestination({
          name: 'User',
          params: { id: 'me' },
          query: { welcome: 'true' },
          hash: 'top',
        })
      ).toBe('/base/users/me?welcome=true#top');
    });
  });
});

describe('getTemplateByDepth', () => {
  it('should return null when no router is found', () => {
    expect(getTemplateByDepth(0)).toBe(null);
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes, base: '/base' });
    });

    beforeEach(() => navigate('/'));

    afterAll(() => {
      unmountRouter();
    });

    it('should get element by depth (0 => layout)', () => {
      expect(getTemplateByDepth(0)).toStrictEqual(
        <div>
          <Outlet />
        </div>
      );
    });

    it('should get element by depth (1 => page)', () => {
      expect(getTemplateByDepth(1)).toStrictEqual(<div>Home</div>);
    });

    it('should get not found when page is not found', () => {
      navigate('/something-incredible');

      expect(getTemplateByDepth(1)).toStrictEqual(<div>not found</div>);
    });

    it('should return undefined when depth exceeds steps length', () => {
      expect(getTemplateByDepth(2)).toStrictEqual(undefined);
    });

    it('should get element by depth (2 => index page)', () => {
      navigate('/users');

      expect(getTemplateByDepth(2)).toStrictEqual(<div>Welcome Users</div>);
    });

    it('should get element by depth (2 => parameterized page)', () => {
      navigate('/users/123');

      expect(getTemplateByDepth(2)).toStrictEqual(<div>User Id</div>);
    });

    it('should get element by depth (3 => nested in parameterized page)', () => {
      navigate('/users/123/options');

      expect(getTemplateByDepth(3)).toStrictEqual(<div>User options</div>);
    });

    it('should get scope not found when page is not found', () => {
      navigate('/users/123/something');

      expect(getTemplateByDepth(3)).toStrictEqual(<div>Not Found in Users</div>);
    });
  });
});

describe('getPathname', () => {
  it('should throw when router is not mounted', () => {
    expect(() => getPathname()).toThrow(new RuvyError('a router is yet to be created'));
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes, base: '/base' });
    });

    beforeEach(() => navigate('/'));

    afterAll(() => {
      unmountRouter();
    });

    it('should return pathname', () => {
      expect(getPathname()).toBe('/');
    });

    it('should return pathname without base', () => {
      navigate('/base/test');

      expect(getPathname()).toBe('/test');
    });

    it('should return pathname (nested)', () => {
      navigate({ name: 'UserOptions', params: { id: '123' } });

      expect(getPathname()).toBe('/users/123/options');
    });
  });
});

describe('getSearchParams', () => {
  it('should throw when router is not mounted', () => {
    expect(() => getSearchParams()).toThrow(new RuvyError('a router is yet to be created'));
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes });
    });

    beforeEach(() => navigate('/'));

    afterAll(() => {
      unmountRouter();
    });

    it('should return empty search record', () => {
      expect(getSearchParams()).toStrictEqual({});
    });

    it('should return filled search record', () => {
      navigate({ name: 'UserOptions', query: { users: '123', test: 'false' } });

      expect(getSearchParams()).toStrictEqual({ users: '123', test: 'false' });
    });
  });
});

describe('getParams', () => {
  it('should throw when router is not mounted', () => {
    expect(() => getParams()).toThrow(new RuvyError('a router is yet to be created'));
  });

  describe('with router', () => {
    beforeAll(() => {
      createRouter({ routes });
    });

    beforeEach(() => navigate('/'));

    afterAll(() => {
      unmountRouter();
    });

    it('should return empty record', () => {
      expect(getParams()).toStrictEqual({});
    });

    it('should return record with id', () => {
      navigate({ name: 'UserOptions', params: { id: '123' } });

      expect(getParams()).toStrictEqual({ id: '123' });
    });
  });
});
