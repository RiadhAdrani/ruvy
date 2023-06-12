import useMarkdown from '../hooks/useMarkdown.js';
import docMD from '../md/docs/docs.md';
import Markdown from '../components/Markdown.js';
import { useMemo, getRoute, Outlet } from '../index.js';
import { DocsSections } from '../md/docs.js';
import SideBar from '../components/SideBar.js';

export default () => {
  const content = useMarkdown(docMD);

  const showMain = useMemo(() => {
    return getRoute() === '/docs';
  }, getRoute());

  return (
    <>
      <SideBar items={DocsSections} root="/docs" />
      <div
        class={[
          'row overflow-x-none flex-1 justify-stretch self-stretch',
          'm-l-0 md:m-l-[var(--side-bar-width)]',
          'p-l-0 md:p-l-10',
        ]}
      >
        {showMain ? <Markdown content={content} /> : <Outlet />}
      </div>
    </>
  );
};
