import { RawRoute, RuvyNode } from '../index.js';
import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import About from '../pages/About.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';
import NotFound from '../components/NotFound.js';
import { DocsSections } from '../md/docs.js';
import DocSection from '../components/DocSection.js';

export const routes: Array<RawRoute<RuvyNode>> = [
  { path: '/', title: 'Ruvy', component: <Home /> },
  { path: '/docs', title: 'Docs', component: <Docs /> },
  { path: '/learn', title: 'Learn', component: <Learn /> },
  { path: '/about', title: 'About', component: <About /> },
  { path: '/examples', title: 'Examples', component: <Examples /> },
  { path: '**', component: <NotFound /> },
  ...DocsSections.map<RawRoute<RuvyNode>>(it => {
    const path = `/docs${it.path}`;

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
  }),
];
