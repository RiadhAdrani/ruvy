import { useEffect, useState } from '../index.js';
import { Core, mountApp } from '../core/Core.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { runAfter } from '@riadh-adrani/utils';

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

  describe('switch case case:default directives', () => {
    it('should render first children with fullfilled switch case', () => {
      const App = () => {
        return (
          <div switch={3}>
            <div case={0} class="0" />
            <div case={1} class="1" />
            <div case={2} class="2" />
            <div case={3} class="3" />
            <div case={4} class="4" />
            <div case={5} class="5" />
          </div>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<div><div class="3"></div></div>');
    });

    it('should work with updates', async () => {
      const App = () => {
        const [count, setCount] = useState(0);

        useEffect(() => {
          runAfter(20, () => {
            setCount(5);
          });
        });

        return (
          <div switch={count}>
            <div case={0} class="0" />
            <div case={1} class="1" />
            <div case={2} class="2" />
            <div case={3} class="3" />
            <div case={4} class="4" />
            <div case={5} class="5" />
          </div>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<div><div class="0"></div></div>');

      setTimeout(() => {
        expect(document.body.innerHTML).toBe('<div><div class="5"></div></div>');
      }, 30);
    });
  });
});
