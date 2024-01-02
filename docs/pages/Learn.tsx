import Markdown from '../components/Markdown.js';
import useMarkdown from '../hooks/useMarkdown.js';
import learnMD from '../md/learn/learn.md';

export default () => {
  const content = useMarkdown(learnMD);

  return (
    <>
      <Markdown content={content} />
    </>
  );
};
