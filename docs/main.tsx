import { createRouter, mountApp } from '../src/index.js';
import App from './App.js';
import { routes } from './router/routes.js';
import './style/index.scss';
import 'virtual:uno.css';

createRouter(routes, { base: '/ruvy', titleSuffix: ' - Ruvy', scrollToTop: false });

mountApp({ callback: App, hostElement: document.querySelector('#app') as HTMLElement });
