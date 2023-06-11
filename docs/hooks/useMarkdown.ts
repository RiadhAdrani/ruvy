import { useEffect, useKey } from '../index.js';

const useMarkdown = (url: string) => {
  const [content, setContent] = useKey<string>(url, '');

  useEffect(() => {
    fetch(url).then(async res => {
      const text = await res.text();

      setContent(text);
    });
  }, [url]);

  return content;
};

export default useMarkdown;
