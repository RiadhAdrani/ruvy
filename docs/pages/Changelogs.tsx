import changelogs from '../../CHANGELOG.md?raw';
import Markdown from '../components/Markdown.js';

export default () => {
  return <Markdown content={changelogs} />;
};
