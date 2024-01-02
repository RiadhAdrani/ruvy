import useMarkdown from '../hooks/useMarkdown.js';
import docMD from '../md/docs/docs.md';
import Markdown from '../components/Markdown.js';

export default () => {
  const content = useMarkdown(docMD);

  return (
    <>
      <Markdown content={content} />
    </>
  );
};
