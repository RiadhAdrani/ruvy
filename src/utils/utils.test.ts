import { describe, expect, it } from 'vitest';
import { joinClasses } from './utils.js';

describe('joinClasses', () => {
  it('should return an empty string with no arguments', () => {
    expect(joinClasses()).toBe('');
  });

  it('should join args', () => {
    expect(joinClasses('one', 'two')).toBe('one two');
  });

  it('should transform arrays to string', () => {
    expect(joinClasses('one', 'two', ['three', 'four'])).toBe('one two three four');
  });

  it('should filter null and undefined', () => {
    expect(joinClasses('one', 'two', null, undefined)).toBe('one two');
  });
});
