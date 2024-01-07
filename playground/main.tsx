import {
  mountApp,
  useState,
  createComposable,
  createContext,
  createRouter,
  Outlet,
  navigate,
} from '../lib/index.js';

export const useCount = createComposable('count', () => {
  const [count, setCount] = useState(0);

  return { count, setCount };
});

createRouter({
  base: '/playground',
  routes: [
    {
      element: (
        <div>
          <nav>
            <a href={'/'}>Home</a>

            <a href={'/users'}>Users</a>

            <a href={'/users/123'}>User 123</a>
          </nav>
          <div>
            <Outlet />
          </div>
        </div>
      ),
      children: [
        { path: '/', element: <div>Home</div> },
        { path: '/*', element: <div>not found</div> },
        {
          path: '/users',
          element: (
            <div>
              <h1>Users</h1>
              <Outlet />
            </div>
          ),
          children: [
            { path: '', element: <div>Welcome Users</div> },
            { path: '/search', element: <div>Search Users</div> },
            { path: '/:id', element: <div>User Id</div> },
          ],
        },
      ],
    },
  ],
});

export const AppContext = createContext<{ app: string; count: number }>();

export const useAppContext = AppContext.use;

const App = () => {
  return (
    <>
      <button onClick={() => navigate(-1)}>back</button>
      <Outlet />
    </>
  );
};

mountApp({
  app: <App />,
  host: document.body,
});
