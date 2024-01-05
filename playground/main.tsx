import { mountApp, useState, createComposable } from '../lib/index.js';

const useCount = createComposable('count', () => {
  const [count, setCount] = useState(0);

  return { count, setCount };
});

const Button = () => {
  const [number, setNumber] = useState(0);

  const { count, setCount } = useCount();

  return (
    <>
      <div>
        <button onClick={() => setNumber(number + 1)}>
          local {number} {number + 1} {number + 2}
        </button>
        <button onClick={() => setCount(count + 1)}>global {count}</button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <Button />
    </>
  );
};

mountApp({
  app: <App />,
  host: document.body,
});
