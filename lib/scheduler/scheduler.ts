import { Task } from '@/types.js';
import { generateId } from '../helpers/helpers.js';

const stack: Array<Task> = [];

const iteration = 0;

export const schedule = (callback: () => void) => {
  const task: Task = {
    date: new Date(),
    id: generateId(),
    callback,
  };

  // if there is already a task in the stack,
  // we do not need to add a new one
  // because state is updated immediately
  if (stack.length > 0) {
    return;
  }
};
