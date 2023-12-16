import { Context, ContextType } from '@/types.js';
import { RuvyError } from '../helpers/helpers.js';

const stack: Array<Context> = [];

let ctx: Context = { type: ContextType.Idle };

export const getContext = (): Context => ctx;

export const getContextOrThrow = <T extends Context>(type: ContextType): T => {
  if (ctx.type !== type) throw new RuvyError('requested state does not match the current one');

  return ctx as T;
};

export const runInContext = <V extends Context, R = void>(
  value: V,
  callback: () => R,
  onEnd?: () => void
): R => {
  stack.push(ctx);
  ctx = value;

  const result = callback();

  const v = stack.pop();

  if (!v) {
    throw new RuvyError('unexpected state: no context found in stack');
  }

  ctx = v;

  onEnd?.();

  return result;
};
