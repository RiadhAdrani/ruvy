import { useApp } from '../hooks/composables.js';
import { Outlet, useMemo } from '../index.js';
import { DocItem, Version, Versions } from '../types/index.js';
import SideBar from './SideBar.js';

export interface DocWithSideBarProps {
  sideBarItems: Array<DocItem>;
  rootURL: string;
}

const filterRecursively = (items: Array<DocItem>, version: Version): Array<DocItem> => {
  return items.reduce((acc, it) => {
    const index = Versions.indexOf(version);

    const add = it.versions.some(ver => {
      if (ver.from === version || ver.to === version) {
        return true;
      }
      const from = Versions.indexOf(ver.from);

      if (!ver.to) {
        if (from <= index) {
          return true;
        }
      } else {
        const to = Versions.indexOf(ver.to);

        if (from <= index && index <= to) {
          return true;
        }
      }

      return false;
    });

    if (add) {
      const children = it.children ? filterRecursively(it.children, version) : undefined;

      const entry = { ...it, children };

      acc.push(entry);
    }

    return acc;
  }, [] as Array<DocItem>);
};

const DocWithSideBar = ({ rootURL, sideBarItems }: DocWithSideBarProps) => {
  const { version } = useApp();

  const items = useMemo(() => filterRecursively(sideBarItems, version), [sideBarItems, version]);

  return (
    <>
      <SideBar items={items} root={rootURL} />
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
