import { describe, it, expect, beforeEach } from 'vitest';
import Context from '../Context.js';

describe('Context class', () => {
  let ctx: Context<string>;

  beforeEach(() => {
    ctx = new Context<string>();
  });

  it('should create a new context manager with empty stack and undefined data', () => {
    expect(ctx.data).toBe(undefined);
    expect(ctx.stack).toStrictEqual([]);
  });

  it('should throw when context data is undefined', () => {
    const ctx = new Context<undefined>();

    expect(ctx.start).toThrow('Unexpected Data: context data cannot be undefined.');
  });

  it('should start a new context', () => {
    ctx.start('test');
    expect(ctx.data).toBe('test');
  });

  it('should override old context', () => {
    ctx.start('test');
    ctx.start('test2');
    expect(ctx.data).toBe('test2');
    expect(ctx.stack).toStrictEqual(['test']);
  });

  it('should end current context', () => {
    ctx.start('test');

    ctx.end();
    expect(ctx.data).toBe(undefined);
  });

  it('should end current context and set the last one as current', () => {
    ctx.start('test');
    ctx.start('test2');

    ctx.end();
    expect(ctx.data).toBe('test');
  });

  it('should return value of callback', () => {
    const res = ctx.use(() => 0, 'test');
    expect(res).toBe(0);
  });

  it('should retrieve context data within the callback (x1)', () => {
    ctx.use(() => {
      expect(ctx.get()).toBe('test');
    }, 'test');
  });

  it('should retrieve context data within nested callback (x2)', () => {
    ctx.use(() => {
      ctx.use(() => {
        expect(ctx.get()).toBe('tester');
      }, 'tester');
      expect(ctx.get()).toBe('test');
    }, 'test');
  });
});
