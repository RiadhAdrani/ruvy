import { Outlet, PropsWithChildren, useMemo, getPathname } from '../index.js';
import useMarkdown from '../hooks/useMarkdown.js';
import Markdown from './Markdown.js';

export default ({ url, path }: PropsWithChildren<{ url: string; path: string }>) => {
  const content = useMarkdown(url);

  const showMain = useMemo(() => {
    return getPathname() === path;
  }, getPathname());

  return showMain ? <Markdown content={content} /> : <Outlet />;
};
