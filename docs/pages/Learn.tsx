import Markdown from '../components/Markdown.js';
import useMarkdown from '../hooks/useMarkdown.js';
import learnMD from '../md/learn/learn.md';
import DocWithSideBar from '../components/DocWithSideBar.js';
import { LearnSections } from '../md/learn.js';
export default () => {
  const content = useMarkdown(learnMD);

  return (
    <>
      <DocWithSideBar
        mainComponent={<Markdown content={content} />}
        rootURL="/learn"
        sideBarItems={LearnSections}
      />
    </>
  );
};
