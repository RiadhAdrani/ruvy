import { createComposable, useState } from '../index.js';

const useMarkdowns = createComposable('markdown', () => {
  const [record, setRecord] = useState<Record<string, string>>({});

  const getEntry = (url: string): string => {
    if (url in record) {
      return record[url];
    }

    fetch(url).then(async res => {
      const text = await res.text();

      setRecord(rec => ({ ...rec, [url]: text }));
    });

    return '';
  };

  return { record, getEntry };
});

const useMarkdown = (url: string) => {
  const { getEntry } = useMarkdowns();

  const entry = getEntry(url);

  return entry;
};

export default useMarkdown;
