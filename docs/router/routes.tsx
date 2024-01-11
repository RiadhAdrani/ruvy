import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import Acknowledgment from '../pages/Acknowledgment.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';
import { DocsSections } from '../md/docs.js';

import { LearnSections } from '../md/learn.js';
import { PathRawRoute, RawRoute } from '@riadh-adrani/dom-router';
import { Outlet, RuvyNode } from '../index.js';

import NavBar from '../components/NavBar.js';
import DocWithSideBar from '../components/DocWithSideBar.js';
import Markdown from '../components/Markdown.js';
import NotFound from '../components/NotFound.js';

import apiDoc from '../md/docs/api.md?raw';

export const routes: Array<RawRoute<RuvyNode>> = [
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <div
          class="w-100% overflow-x-hidden row-center p-x-6 m-t-[var(--nav-bar-height)]"
          style={{ minHeight: 'calc(100vh - var(--nav-bar-height))' }}
        >
          <div class="col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-12 md:p-y-10">
            <Outlet />
          </div>
        </div>
      </>
    ),
    children: [
      { path: '', title: 'Home', element: <Home />, name: 'Home' },
      { path: '/docs', title: 'Docs', element: <Docs /> },
      { path: '/learn', title: 'Learn', element: <Learn />, name: 'Learn' },
      { path: '/acknowledgment', title: 'Acknowledgment', element: <Acknowledgment /> },
      { path: '/examples', title: 'Examples', element: <Examples /> },
      { path: '/*', element: <NotFound /> },
      {
        path: '/learn',
        element: <DocWithSideBar rootURL="/learn" sideBarItems={LearnSections} />,
        children: [
          { path: '', element: <Learn /> },
          ...LearnSections.map(it => ({
            path: it.path,
            element: <Markdown content={it.element as string} />,
          })),
        ],
      },
      {
        path: '/docs',
        element: <DocWithSideBar rootURL="/docs" sideBarItems={DocsSections} />,
        children: [
          { path: '', element: <Docs /> },
          ...DocsSections.map(it => ({
            path: it.path,
            element: <Outlet />,
            children: [
              { path: '', element: <Markdown content={apiDoc} /> },
              ...(it.children as Array<PathRawRoute>).map(sub => ({
                path: sub.path,
                element: <Markdown content={sub.element as string} />,
              })),
            ],
          })),
        ],
      },
    ],
  },
];
