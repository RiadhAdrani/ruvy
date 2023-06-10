import NavBar from './components/NavBar.js';
import { UIProvider } from './context/UI.js';
import { Outlet } from './index.js';

export default () => {
  return (
    <UIProvider>
      <NavBar />
      <div
        class="w-100% overflow-x-hidden row-center p-x-5 m-t-[var(--nav-bar-height)]"
        style={{ minHeight: 'calc(100vh - var(--nav-bar-height))' }}
      >
        <div class="col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-10">
          <Outlet />
        </div>
      </div>
    </UIProvider>
  );
};
