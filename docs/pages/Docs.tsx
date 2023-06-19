import useMarkdown from '../hooks/useMarkdown.js';
import docMD from '../md/docs/docs.md';
import Markdown from '../components/Markdown.js';
import { DocsSections } from '../md/docs.js';
import DocWithSideBar from '../components/DocWithSideBar.js';

export default () => {
  const content = useMarkdown(docMD);

  return (
    <>
      <DocWithSideBar
        mainComponent={<Markdown content={content} />}
        rootURL="/docs"
        sideBarItems={DocsSections}
      />
    </>
  );
};
