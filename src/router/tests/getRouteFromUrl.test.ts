import { beforeEach, describe, expect, it } from 'vitest';
import getRouteFromUrl from '../utils/getRouteFromUrl.js';

describe('getRouteFromUrl', () => {
  beforeEach(() => {
    location.pathname = '';
  });

  it('should return root url "/"', () => {
    const out = getRouteFromUrl();

    expect(out).toBe('/');
  });

  it('should return root url "/" with base', () => {
    const out = getRouteFromUrl('/base');

    expect(out).toBe('/');
  });

  it('should return url', () => {
    history.pushState({}, '', '/test');

    const out = getRouteFromUrl();

    expect(out).toBe('/test');
  });

  it('should return url but with missing base', () => {
    const out = getRouteFromUrl('/base');

    expect(out).toBe('/test');
  });
});
