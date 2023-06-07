import { isDefined, isFunction, Callback } from '@riadh-adrani/utils';

export default class Context<T> {
  data?: T;
  stack: Array<T> = [];

  get(): T | undefined {
    return this.data;
  }

  start(data: T): void {
    if (!isDefined(data)) {
      throw 'Unexpected Data: context data cannot be undefined.';
    }

    if (this.data != undefined) {
      this.stack.push(this.data);
    }

    this.data = data;
  }

  end(): void {
    if (isDefined(this.data)) {
      if (this.stack.length > 0) {
        this.data = this.stack.pop();
      } else {
        this.data = undefined;
      }
    }
  }

  use<R = void>(callback: Callback<R>, data: T, onEnd?: Callback): R {
    if (!isFunction(callback)) {
      throw 'Unexpected Input : callback is not a function.';
    }

    this.start(data);
    const returned = callback();
    this.end();

    onEnd?.();

    return returned;
  }
}
