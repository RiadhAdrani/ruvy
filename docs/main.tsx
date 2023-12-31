import { createRouter, mountApp } from '../lib/index.js';
import App from './App.js';
import NotFound from './components/NotFound.js';
import { routes } from './router/routes.js';
import './style/index.scss';
import 'virtual:uno.css';

createRouter({
  routes,
  base: '/ruvy',
  transformTitle: title => `${title} - Ruvy`,
  correctScrolling: true,
  catchAllElement: <NotFound />,
});

mountApp({ app: <App />, host: document.querySelector('#app') as HTMLElement });
