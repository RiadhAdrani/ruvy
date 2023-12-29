import { generateId } from '../lib/helpers/helpers.js';
import { createRouter, mountApp, useMemo, useState } from '../lib/index.js';
import { Outlet } from '../lib/index.js';

const Button = () => {
  const [text, setText] = useState('');

  const id = useMemo(() => generateId());

  return (
    <>
      <button if={text === 'text'}>text !</button>
      <input
        value={text}
        type={'password'}
        onInput={e => {
          setText(e.currentTarget.value);
        }}
        id={'-' + id}
      />
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
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <a href={'/'}>Home</a>
          <a href={'/html'}>HTML</a>
          <a href={'https://www.youtube.com/'}>HTML</a>
        </div>
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
