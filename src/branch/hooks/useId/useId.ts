import { useEffect, useState } from "../index.js";

const store: Record<string, string> = {};

export const getStore = () => store;

const generateUniqueId = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};

export const createId = (length: number) => {
  let id: string | undefined;

  while (!id || !store[id]) {
    id = generateUniqueId(length);

    if (!store[id]) {
      store[id] = id;
    }
  }

  return id;
};

export const removeId = (id: string) => {
  delete store[id];
};

/**
 * create a unique id of `characters`, `numbers`, `_` and `-` .
 * @param length `5` by default.
 */
export const useId = (length = 5): string => {
  const [id] = useState(createId(length));

  useEffect(() => () => removeId(id));

  return id;
};
