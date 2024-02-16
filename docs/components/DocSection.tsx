import { Outlet, useMemo, getPathname } from '../index.js';
import useMarkdown from '../hooks/useMarkdown.js';
import Markdown from './Markdown.js';
import { PropsWithUtility } from '@/types.js';

export default ({ url, path }: PropsWithUtility<{ url: string; path: string }>) => {
  const content = useMarkdown(url);

  const showMain = useMemo(() => {
    return getPathname() === path;
  }, getPathname());

  return showMain ? <Markdown content={content} /> : <Outlet />;
};
