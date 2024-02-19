import versions from '../md/docs/index/md.js';
import VersionedMarkdown from '../components/Versioned.markdown.js';

export default () => {
  return (
    <>
      <VersionedMarkdown versions={versions} />
    </>
  );
};
