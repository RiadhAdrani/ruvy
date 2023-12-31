import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import Acknowledgment from '../pages/Acknowledgment.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';
import { DocsSections } from '../md/docs.js';
import DocSection from '../components/DocSection.js';
import { LearnSections } from '../md/learn.js';
import { RawRoute } from '@riadh-adrani/dom-router';
import { Outlet } from '../index.js';
import { UIProvider } from '../context/UI.js';
import NavBar from '../components/NavBar.js';
import { RuvyNode } from '@/types.js';

export const createFromMD = (base: string, items: Array<RawRoute<RuvyNode>>) => {
  return items.map<RawRoute<RuvyNode>>(it => {
    const path = `${base}${it.path}`;

    return {
      ...it,
      element: <DocSection url={it.element as string} path={path} />,
      path,
      children: it.children?.map<RawRoute<RuvyNode>>(sub => {
        const subPath = `${path}/${sub.path}`;

        return {
          ...sub,
          element: <DocSection url={sub.element as string} path={subPath} />,
          path: sub.path,
        };
      }),
    };
  });
};

export const routes: Array<RawRoute<RuvyNode>> = [
  {
    element: (
      <UIProvider>
        <NavBar />
        <div
          class="w-100% overflow-x-hidden row-center p-x-6 m-t-[var(--nav-bar-height)]"
          style={{ minHeight: 'calc(100vh - var(--nav-bar-height))' }}
        >
          <div class="col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-12 md:p-y-10">
            <Outlet />
          </div>
        </div>
      </UIProvider>
    ),
    children: [
      { path: '/', title: 'Home', element: <Home />, name: 'Home' },
      { path: '/docs', title: 'Docs', element: <Docs /> },
      { path: '/learn', title: 'Learn', element: <Learn />, name: 'Learn' },
      { path: '/acknowledgment', title: 'Acknowledgment', element: <Acknowledgment /> },
      { path: '/examples', title: 'Examples', element: <Examples /> },
      ...createFromMD('/docs', DocsSections),
      ...createFromMD('/learn', LearnSections),
    ],
  },
];
