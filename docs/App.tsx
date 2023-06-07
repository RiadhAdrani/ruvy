import NavBar from './components/NavBar.js';
import { UIProvider } from './context/UI.js';
import { Outlet } from './index.js';

export default () => {
  return (
    <UIProvider>
      <NavBar />
      <Outlet />
    </UIProvider>
  );
};
