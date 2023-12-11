export class RuvyError extends Error {
  constructor(message: string) {
    super();

    this.message = `[Ruvy] : ${message}`;
  }
}

const generatedIds: Array<string> = [];

export const generateId = (): string => {
  let id = '';

  do {
    const ms = Date.now();

    const rnd10 = Math.floor(Math.random() * 10) + 10;
    const rnd100 = Math.floor(Math.random() * 100) + 100;
    const rnd1000 = Math.floor(Math.random() * 1000) + 1000;

    id = `${ms}-${rnd10}-${rnd100}-${rnd1000}`;
  } while (generatedIds.includes(id));

  return id;
};
