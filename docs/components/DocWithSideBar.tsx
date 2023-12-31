import { Outlet, getPathname } from '../index.js';
import { DocItem } from '../types/index.js';
import SideBar from './SideBar.js';
import { RuvyNode } from '@/types.js';

export interface DocWithSideBarProps {
  sideBarItems: Array<DocItem>;
  mainComponent: RuvyNode;
  rootURL: string;
}

const DocWithSideBar = ({ rootURL, mainComponent, sideBarItems }: DocWithSideBarProps) => {
  const route = getPathname();

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
