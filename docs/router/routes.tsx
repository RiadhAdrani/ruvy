import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import Acknowledgment from '../pages/Acknowledgment.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';
import { DocsSections } from '../md/docs.js';

import { LearnSections } from '../md/learn.js';
import { RawRoute } from '@riadh-adrani/dom-router';
import { Outlet, RuvyNode } from '../index.js';

import NavBar from '../components/NavBar.js';
import DocWithSideBar from '../components/DocWithSideBar.js';
import NotFound from '../components/NotFound.js';

import VersionedMarkdown from '../components/Versioned.markdown.js';
import { DocItem } from '../types/index.js';
import Changelogs from '../pages/Changelogs.js';

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
      { path: '/*', element: <NotFound /> },
      { path: '', title: 'Home', element: <Home />, name: 'Home' },
      { path: '/changelogs', title: 'Changelogs', element: <Changelogs />, name: 'ChangeLogs' },
      { path: '/acknowledgment', title: 'Acknowledgment', element: <Acknowledgment /> },
      { path: '/examples', title: 'Examples', element: <Examples /> },
      {
        path: '/learn',
        title: 'Learn',
        element: <DocWithSideBar rootURL="/learn" sideBarItems={LearnSections} />,
        children: [
          { path: '', element: <Learn /> },
          ...LearnSections.map(it => ({
            title: it.title,
            path: it.path,
            element: <VersionedMarkdown versions={it.versions} />,
          })),
        ],
      },
      {
        path: '/docs',
        title: 'Docs',
        element: <DocWithSideBar rootURL="/docs" sideBarItems={DocsSections} />,
        children: [
          { path: '', element: <Docs /> },
          ...DocsSections.map(it => ({
            path: it.path,
            title: it.title,
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <VersionedMarkdown versions={it.versions} />,
              },
              ...(it.children as Array<DocItem>).map(sub => ({
                path: sub.path,
                title: sub.title,
                element: <VersionedMarkdown versions={sub.versions} />,
              })),
            ],
          })),
        ],
      },
    ],
  },
];
