import Markdown from '../components/Markdown.js';
import examples from '../md/examples/examples.md';
import useMarkdown from '../hooks/useMarkdown.js';

export default () => {
  const content = useMarkdown(examples);

  return (
    <>
      <Markdown content={content} />
    </>
  );
};
