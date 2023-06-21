import Markdown from '../components/Markdown.js';
import acknowledgment from '../md/acknowledgment/acknowledgment.md';
import useMarkdown from '../hooks/useMarkdown.js';

export default () => {
  const content = useMarkdown(acknowledgment);

  return (
    <>
      <Markdown content={content} />
    </>
  );
};
