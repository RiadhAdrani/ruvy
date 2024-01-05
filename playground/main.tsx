import { createRouter, mountApp, useState, createComposable } from '../lib/index.js';
import { Outlet, unmountApp } from '../lib/index.js';

const useTheme = createComposable('theme', () => {
  const [theme, setTheme] = useState(true);

  return { theme, setTheme };
});

const Button = () => {
  const $theme = useTheme();

  const { setTheme, theme } = $theme;

  return (
    <>
      <button
        onClick={() => {
          setTheme(!theme);
        }}
      >
        {theme ? 'Dark' : 'Light'}
      </button>
    </>
  );
};

createRouter({
  base: '/playground',
  routes: [
    {
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: '/',
          element: 'yeet',
        },
        {
          path: '/html',
          element: 'HTML',
          name: 'HTML',
        },
      ],
    },
  ],
});

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <a className="blue" class:red={false} href={'/'}>
            Home
          </a>
          <a href={{ name: 'HTML', query: { age: 2, name: 'ree' } }}>HTML</a>
          <a if={count} href={'https://www.youtube.com/'}>
            HTML
          </a>
        </div>
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <button onClick={() => unmountApp()}>unmount app</button>
        <Button />
        <Button />
        <Outlet />
      </div>
    </>
  );
};

mountApp({
  app: <App />,
  host: document.body,
});
