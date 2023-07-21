import { useEffect, createStore, useState } from '../index.js';

const [getMarkdownStore, setMarkdownStore] = createStore<Record<string, string>>('md-store', {});

const addEntry = (url: string, content: string) => {
  setMarkdownStore({ ...getMarkdownStore(), [url]: content });
};

const useMarkdown = (url: string) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const current: string | undefined = getMarkdownStore()[url];

    if (content) {
      setContent(current);
    } else {
      fetch(url).then(async res => {
        const text = await res.text();

        addEntry(url, text);
        setContent(text);
      });
    }
  }, [url]);

  return content;
};

export default useMarkdown;
