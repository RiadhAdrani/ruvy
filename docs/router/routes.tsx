import { RawRoute, RuvyNode } from '../index.js';
import Home from '../pages/Home.js';
import Docs from '../pages/Docs.js';
import About from '../pages/About.js';
import Examples from '../pages/Examples.js';
import Learn from '../pages/Learn.js';

export const routes: Array<RawRoute<RuvyNode>> = [
  { path: '/', title: 'Ruvy', component: <Home /> },
  { path: '/docs', title: 'Docs', component: <Docs /> },
  { path: '/learn', title: 'Learn', component: <Learn /> },
  { path: '/about', title: 'About', component: <About /> },
  { path: '/examples', title: 'Examples', component: <Examples /> },
];
