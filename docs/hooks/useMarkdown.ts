import { useEffect, createStore, useMemo } from '../index.js';

const [getMarkdownStore, setMarkdownStore] = createStore<Record<string, string>>('md-store', {});

const addEntry = (url: string, content: string) => {
  setMarkdownStore({ ...getMarkdownStore(), [url]: content });
};

const useMarkdown = (url: string) => {
  const content = useMemo(() => {
    const md = getMarkdownStore()[url];

    return md ?? '';
  }, [getMarkdownStore(), url]);

  useEffect(() => {
    const current: string | undefined = getMarkdownStore()[url];

    if (!current) {
      fetch(url).then(async res => {
        const text = await res.text();

        addEntry(url, text);
      });
    }
  }, [url]);

  return content;
};

export default useMarkdown;
