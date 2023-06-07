import { Task } from './types.js';

export default class Scheduler {
  stack: Array<Task> = [];
  current: Task | undefined;

  enqueue(task: Task) {
    const index = this.stack.findIndex($task => task.type === $task.type);

    if (index !== -1) {
      this.stack = [...this.stack.slice(0, index), task, ...this.stack.slice(index + 1)];
    } else {
      this.stack.push(task);
    }
  }

  schedule(task: Task) {
    this.enqueue(task);
    this.start();
  }

  start() {
    if (this.current) {
      return;
    }

    this.current = this.stack.shift();

    if (!this.current) {
      return;
    }

    this.current.callback();
    this.current = undefined;

    if (this.stack.length !== 0) {
      this.start();
    } else {
      this.current = undefined;
    }
  }
}
