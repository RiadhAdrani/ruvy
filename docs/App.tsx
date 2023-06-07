import Markdown from './components/Markdown.js';
import NavBar from './components/NavBar.js';
import { UIProvider } from './context/UI.js';
import { Outlet, usePromise } from './index.js';
import md from './md/test.md';

export default () => {
  const [, content] = usePromise(async () => {
    const res = await fetch(md);

    if (res.status === 200) {
      return await res.text();
    }

    throw 'Unable to load doc';
  });

  return (
    <UIProvider>
      <NavBar />
      <Markdown content={content ?? ''} />
      <Outlet />
    </UIProvider>
  );
};
