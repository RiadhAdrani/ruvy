import { useEffect, useState } from '../index.js';

const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, set, get] = useState<T>(
    localStorage.getItem(key) !== null
      ? (JSON.parse(localStorage.getItem(key) as string) as T)
      : initValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, set, get] as const;
};

export default useLocalStorage;
