import Markdown from '../components/Markdown.js';
import about from '../md/about/about.md';
import useMarkdown from '../hooks/useMarkdown.js';

export default () => {
  const content = useMarkdown(about);

  return (
    <>
      <Markdown content={content} />
    </>
  );
};
