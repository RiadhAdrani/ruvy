export class RuvyError extends Error {
  constructor(message: string) {
    super();

    this.message = `[Ruvy] : ${message}`;
  }
}

let counter = 0;
let lastTime = -1;

export const generateId = (): string => {
  let id = '';

  const ms = Date.now();

  if (ms - lastTime < 10) {
    counter++;
  } else {
    counter = 0;
  }

  lastTime = ms;

  const rnd10 = Math.floor(Math.random() * 10) + 10;
  const rnd100 = Math.floor(Math.random() * 100) + 100;
  const rnd1000 = Math.floor(Math.random() * 10) + 10;

  id = `${ms}-${counter}-${rnd10}-${rnd100}-${rnd1000}`;

  return id;
};

export function moveElement<T>(array: Array<T>, fromIndex: number, toIndex: number): Array<T> {
  const arrayCopy = [...array];
  const element = arrayCopy.splice(fromIndex, 1)[0];

  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
}
