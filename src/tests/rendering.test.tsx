import { Portal, useEffect, useMemo, useState } from '../index.js';
import { Core, batch, mountApp } from '../core/Core.js';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { runAfter } from '@riadh-adrani/async-utils';
import { Fragment } from '../branch/components/fragment/fragment.js';

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
          runAfter(() => {
            setCount(5);
          }, 20);
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

      await runAfter(() => {
        expect(document.body.innerHTML).toBe('<div><div class="5"></div></div>');
      }, 30);
    });
  });

  describe('batching', () => {
    it('should batch updates [useEffect]', () => {
      const fn = vitest.fn();

      const App = () => {
        const [, setCount] = useState(0);
        const [, setCount2] = useState(0);

        fn();

        useEffect(() => {
          setCount(1);
          setCount2(2);
        });

        return <div></div>;
      };

      mount(<App />);

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should batch updates [DOM events]', () => {
      const fn = vitest.fn();

      const App = () => {
        const [, setCount] = useState(0);
        const [, setCount2] = useState(0);

        fn();

        return (
          <button
            onClick={() => {
              setCount(1);
              setCount2(2);
            }}
          ></button>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should batch updates [batch]', async () => {
      const fn = vitest.fn();

      const App = () => {
        const [, setCount] = useState(0);
        const [, setCount2] = useState(0);

        fn();

        useEffect(() => {
          runAfter(() => {
            batch(() => {
              setCount(1);
              setCount2(2);
            });
          }, 50);
        });

        return <button></button>;
      };

      mount(<App />);

      await runAfter(() => 0, 120);

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should update innerHTML', () => {
      const fn = vitest.fn();

      const App = () => {
        const [value, set] = useState('1');

        fn();

        return (
          <>
            <button onClick={() => set('2')} />
            <div dom:innerHTML={value} />
          </>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<button></button><div>1</div>');

      document.body.querySelector('button')?.click();

      expect(document.body.innerHTML).toBe('<button></button><div>2</div>');
    });
  });

  describe('event modifiers', () => {
    it('should stop propagation with :stop modifier', () => {
      const onParentClick = vitest.fn();
      const onChildClick = vitest.fn();

      const App = () => {
        return (
          <div onClick={onParentClick}>
            <button onClick:stop={onChildClick}>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(onParentClick).toHaveBeenCalledTimes(0);
      expect(onChildClick).toHaveBeenCalledOnce();
    });

    it('should stop propagation with :stop modifier without with true as value', () => {
      const onParentClick = vitest.fn();

      const App = () => {
        return (
          <div onClick={onParentClick}>
            <button onClick:stop>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(onParentClick).toHaveBeenCalledTimes(0);
    });

    it('should stop propagation with :prevent-stop modifier', () => {
      const onParentClick = vitest.fn();
      const onChildClick = vitest.fn();

      const App = () => {
        return (
          <div onClick={onParentClick}>
            <button onClick:prevent-stop={onChildClick}>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(onParentClick).toHaveBeenCalledTimes(0);
      expect(onChildClick).toHaveBeenCalledOnce();
    });

    it('should prevent default with :prevent modifier', () => {
      let stopped = false;

      const App = () => {
        return (
          <div>
            <button onClick:prevent={e => (stopped = e.defaultPrevented)}>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(stopped).toBe(true);
    });

    it('should prevent default with :prevent-stop modifier', () => {
      let stopped = false;

      const App = () => {
        return (
          <div>
            <button onClick:prevent-stop={e => (stopped = e.defaultPrevented)}>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(stopped).toBe(true);
    });

    it('should not prevent default without :prevent modifier', () => {
      let stopped = false;

      const App = () => {
        return (
          <div>
            <button onClick={e => (stopped = e.defaultPrevented)}>hello</button>
          </div>
        );
      };

      mount(<App />);

      document.body.querySelector('button')?.click();

      expect(stopped).toBe(false);
    });
  });

  describe('portal rendering', () => {
    it('should render element in container', () => {
      const App = () => {
        return (
          <Fragment>
            <div></div>
            <Portal container={document.body}>
              <button />
            </Portal>
          </Fragment>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<button></button><div></div>');
    });

    it('should change element in new container', () => {
      const App = () => {
        const [v, setV] = useState(false);

        const container = useMemo(() => {
          if (!v) return document.body;

          return document.querySelector('#container') as Element;
        }, v);

        useEffect(() => {
          setV(true);
        });

        return (
          <>
            <div id="container"></div>
            <Portal container={container}>
              <button />
            </Portal>
          </>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<div id="container"><button></button></div>');
    });

    it('should change every child in new container', () => {
      const App = () => {
        const [v, setV] = useState(false);

        const container = useMemo(() => {
          if (!v) return document.body;

          return document.querySelector('#container') as Element;
        }, v);

        useEffect(() => {
          setV(true);
        });

        return (
          <>
            <div id="container"></div>
            <Portal container={container}>
              <>
                <button />
                <img />
                <span />
                <>
                  <button />
                  <img />
                  <span />
                </>
              </>
            </Portal>
          </>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe(
        '<div id="container"><button></button><img><span></span><button></button><img><span></span></div>'
      );
    });
  });

  describe('text node rendering', () => {
    it('should render text node', () => {
      const App = () => {
        return <>hello</>;
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('hello');
    });

    it('should render nodes correctly', () => {
      const App = () => {
        const [count, setCount] = useState<number | undefined>(undefined);

        useEffect(() => {
          setCount(0);
        });

        return <>{count} test</>;
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('0 test');
    });
  });

  describe('Fragment Rendering', () => {
    it('should render fragment children into the parent', () => {
      const App = () => {
        return <Fragment>hello</Fragment>;
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('hello');
    });

    it('should not render fragment children when "if" is false', () => {
      const App = () => {
        return <Fragment if={false}>hello</Fragment>;
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('');
    });

    it('should render fragment children satisfying switch statement', () => {
      const App = () => {
        return (
          <Fragment switch={1}>
            <div case={0}>0</div>
            <div case={1}>1</div>
            <div case={2}>2</div>
          </Fragment>
        );
      };

      mount(<App />);

      expect(document.body.innerHTML).toBe('<div>1</div>');
    });
  });
});
