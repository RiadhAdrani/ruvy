import docMD from '../md/docs/docs.md?raw';
import Markdown from '../components/Markdown.js';

export default () => {
  return (
    <>
      <Markdown content={docMD} />
    </>
  );
};
