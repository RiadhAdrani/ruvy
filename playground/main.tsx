import { generateHexId } from '../lib/helpers/helpers.js';
import { mountApp, useState, useMemo } from '../lib/index.js';

const id1 = generateHexId();
const id2 = generateHexId();
const id3 = generateHexId();
const id4 = generateHexId();

const App = () => {
  const [reverse, setReverse] = useState(false);

  const items = useMemo(() => {
    const arr = [id1, id2, id3, id4];

    if (reverse) {
      arr.reverse();
    }

    return arr;
  }, [reverse]);

  return (
    <>
      <button onClick={() => setReverse(!reverse)}>reverse</button>
      <p>{items}</p>
      <>
        {items.map(id => (
          <div key={id}>{id}</div>
        ))}
      </>
    </>
  );
};

mountApp({
  app: <App />,
  host: document.body,
});
