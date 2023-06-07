import { beforeEach, describe, expect, it, vitest } from 'vitest';
import type { Task } from '../types.js';
import Scheduler from '../Scheduler.js';

describe('Scheduler class', () => {
  let scheduler: Scheduler;

  beforeEach(() => {
    scheduler = new Scheduler();
  });

  it('should create a new scheduler with empty stack and task', () => {
    expect(scheduler.current).toBe(undefined);
    expect(scheduler.stack).toStrictEqual([]);
  });

  it('should pop and start a new task', () => {
    const callback = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    scheduler.stack.push(task);

    scheduler.start();

    expect(scheduler.stack).toStrictEqual([]);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(scheduler.current).toBe(undefined);
  });

  it('should not start a new task when one is being executed', () => {
    const callback = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    const task2: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    scheduler.stack.push(task2);
    scheduler.current = task;
    scheduler.start();

    expect(scheduler.stack).toStrictEqual([task2]);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should run all tasks', () => {
    const callback = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    const task2: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    scheduler.stack.push(task, task2);
    scheduler.start();

    expect(scheduler.stack).toStrictEqual([]);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(scheduler.current).toBe(undefined);
  });

  it('should enqueue a new task', () => {
    const callback = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    scheduler.enqueue(task);

    expect(scheduler.stack).toStrictEqual([task]);
  });

  it('should replace task with same type', () => {
    const callback = vitest.fn(() => 0);

    const callback2 = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: 'test',
      type: 'test',
    };

    const task2: Task = {
      callback: callback2,
      date: Date.now(),
      id: 'test2',
      type: 'test',
    };

    scheduler.enqueue(task);
    scheduler.enqueue(task2);

    expect(scheduler.stack).toStrictEqual([task2]);
  });

  it('should replace task with same type at exact position', () => {
    const callback = vitest.fn(() => 0);

    const callback2 = vitest.fn(() => 0);

    const task: Task = {
      callback,
      date: Date.now(),
      id: '1',
      type: 'test',
    };

    const task2: Task = {
      callback: callback2,
      date: Date.now(),
      id: '2',
      type: 'test2',
    };

    const task3: Task = {
      callback: callback2,
      date: Date.now(),
      id: '3',
      type: 'test3',
    };

    const task4: Task = {
      callback: callback2,
      date: Date.now(),
      id: '4',
      type: 'test',
    };

    scheduler.enqueue(task2);
    scheduler.enqueue(task);
    scheduler.enqueue(task3);

    scheduler.enqueue(task4);

    expect(scheduler.stack).toStrictEqual([task2, task4, task3]);
  });
});
