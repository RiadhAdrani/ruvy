import { Outlet } from '../index.js';
import { DocItem } from '../types/index.js';
import SideBar from './SideBar.js';

export interface DocWithSideBarProps {
  sideBarItems: Array<DocItem>;
  rootURL: string;
}

const DocWithSideBar = ({ rootURL, sideBarItems }: DocWithSideBarProps) => {
  return (
    <>
      <SideBar items={sideBarItems} root={rootURL} />
      <div
        class={[
          'row overflow-x-none flex-1 justify-stretch self-stretch',
          'm-l-0 md:m-l-[var(--side-bar-width)]',
          'p-l-0 md:p-l-10',
        ]}
      >
        <Outlet />
      </div>
    </>
  );
};

export default DocWithSideBar;
