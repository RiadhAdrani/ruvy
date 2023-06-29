import { Core, mountApp } from '../core/Core.js';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Rendering', () => {
  const mount = (app: JSX.Element) => mountApp({ callback: () => app, hostElement: document.body });

  beforeEach(() => {
    new Core();
    document.body.innerHTML = '';
  });

  describe('if else-if else directives', () => {
    it('should render element when if is truthy', () => {
      mount(<div />);

      expect(document.body.innerHTML).toBe('<div></div>');
    });

    it('should not render element when if is falsy', () => {
      mount(<div if={false}></div>);

      expect(document.body.innerHTML).toBe('');
    });

    it('should not render an "else" element when previous if is truthy', () => {
      mount(
        <>
          <div if={true} />
          <div else />
        </>
      );

      expect(document.body.innerHTML).toBe('<div></div>');
    });

    it('should not render an "else-if" element when previous if is truthy', () => {
      mount(
        <>
          <div if />
          <button else-if />
        </>
      );

      expect(document.body.innerHTML).toBe('<div></div>');
    });

    it('should not render an "else-if" element when previous else-if is truthy', () => {
      mount(
        <>
          <div if={false} />
          <img else-if />
          <button else-if />
        </>
      );

      expect(document.body.innerHTML).toBe('<img>');
    });

    it('should not render an "else" element when previous else-if is truthy', () => {
      mount(
        <>
          <div if={false} />
          <img else-if />
          <button else />
        </>
      );

      expect(document.body.innerHTML).toBe('<img>');
    });

    it('should render "else" element when previous "else-if" and "if" are falsy', () => {
      mount(
        <>
          <div if={false} />
          <img else-if={false} />
          <p else-if={false} />
          <span else-if={false} />
          <button else />
        </>
      );

      expect(document.body.innerHTML).toBe('<button></button>');
    });

    it('should throw when else is have no previous if or else-if', () => {
      expect(() =>
        mount(
          <>
            <div else />
          </>
        )
      ).toThrow();
    });

    it('should throw when else-if is have no previous if or else-if', () => {
      expect(() =>
        mount(
          <>
            <div else-if />
          </>
        )
      ).toThrow();
    });
  });
});
