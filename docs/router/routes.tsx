import { RawRoute, RuvyNode } from '../index.js';
import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import Acknowledgment from '../pages/Acknowledgment.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';
import NotFound from '../components/NotFound.js';
import { DocsSections } from '../md/docs.js';
import DocSection from '../components/DocSection.js';
import { LearnSections } from '../md/learn.js';

export const createFromMD = (base: string, items: Array<RawRoute<RuvyNode>>) => {
  return items.map<RawRoute<RuvyNode>>(it => {
    const path = `${base}${it.path}`;

    return {
      ...it,
      component: <DocSection url={it.component as string} path={path} />,
      path,
      routes: it.routes?.map<RawRoute<RuvyNode>>(sub => {
        const subPath = `${path}/${sub.path}`;

        return {
          ...sub,
          component: <DocSection url={sub.component as string} path={subPath} />,
          path: sub.path,
        };
      }),
    };
  });
};

export const routes: Array<RawRoute<RuvyNode>> = [
  { path: '/', title: 'Ruvy', component: <Home /> },
  { path: '/docs', title: 'Docs', component: <Docs /> },
  { path: '/learn', title: 'Learn', component: <Learn /> },
  { path: '/acknowledgment', title: 'Acknowledgment', component: <Acknowledgment /> },
  { path: '/examples', title: 'Examples', component: <Examples /> },
  { path: '**', component: <NotFound /> },
  ...createFromMD('/docs', DocsSections),
  ...createFromMD('/learn', LearnSections),
];
