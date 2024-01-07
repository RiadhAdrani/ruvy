import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Outlet, createRouter, navigate, unmountRouter } from '../../docs/index.js';
import { RawRoute } from '@riadh-adrani/dom-router';
import { Template } from '@/types.js';
import { __test__mount, __test__unmount } from './utils.js';
import { wait } from '@/helpers/helpers.js';
import { getParams } from '@/router/router.js';

const ProjectPage = () => {
  const params = getParams();

  return <div>{params.id}</div>;
};

const routes: Array<RawRoute<Template>> = [
  {
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      { path: '/', element: <div>Home</div>, name: 'Root' },
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
            name: 'User',
            element: (
              <div>
                <p>UserId</p>
                <Outlet />
              </div>
            ),
            children: [
              {
                path: '',
                element: <p>Welcome back</p>,
              },
              { path: '*', element: <div>Not Found in Users</div> },
              { path: '/options', element: <div>User options</div>, name: 'UserOptions' },
            ],
          },
        ],
      },
      {
        path: '/editor',
        element: (
          <main>
            <Outlet />
          </main>
        ),
        children: [
          { path: '', element: <div>to start editing select a project</div> },
          { path: '/:id', element: <ProjectPage /> },
        ],
      },
      { path: '/*', element: <div>not found</div>, name: 'Not Found' },
    ],
  },
];

describe('browser router', () => {
  beforeEach(async () => {
    createRouter({ routes });

    await __test__mount(<Outlet />);
  });

  afterEach(async () => {
    unmountRouter();

    await __test__unmount();
  });

  it('should render page correctly (/)', () => {
    expect(document.body.innerHTML).toBe('<div><div>Home</div></div>');
  });

  it('should render page correctly (/users)', async () => {
    navigate('/users');

    await wait(10);

    expect(document.body.innerHTML).toBe(
      '<div><div><h1>Users</h1><div>Welcome Users</div></div></div>'
    );
  });

  it('should render page correctly (/users/me)', async () => {
    navigate('/users/me');

    await wait(10);

    expect(document.body.innerHTML).toBe(
      '<div><div><h1>Users</h1><div><p>UserId</p><p>Welcome back</p></div></div></div>'
    );
  });

  it('should render page correctly (/editor/ruvy)', async () => {
    navigate('/editor/ruvy');

    await wait(10);

    expect(document.body.innerHTML).toBe('<div><main><div>ruvy</div></main></div>');
  });
});
