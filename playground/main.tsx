import { createRouter, mountApp, useState, createComposable } from '../lib/index.js';
import { Outlet } from '../lib/index.js';

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
          console.log('toggling...');

          setTheme(!theme);
        }}
      >
        {theme ? 'Dark' : 'Light'}
      </button>
    </>
  );
};

createRouter({
  catchAllElement: <div>not found</div>,
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
          <a href={'/'}>Home</a>
          <a href={'/html'}>HTML</a>
          <a href={'https://www.youtube.com/'}>HTML</a>
        </div>
        <button onClick={() => setCount(count + 1)}>{count}</button>
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
