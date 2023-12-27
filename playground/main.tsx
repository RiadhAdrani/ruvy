import { generateId } from '../lib/helpers/helpers.js';
import { mountApp, useEffect, useMemo, useState } from '../lib/index.js';

const Button = () => {
  const [text, setText] = useState('0');

  const id = useMemo(() => generateId());

  useEffect(() => {
    console.log(text);
  }, text);

  return (
    <>
      <button if={text === 'text'}>You entered the magic word text !</button>
      <input
        value={text}
        type={'text'}
        onInput={e => {
          setText(e.currentTarget.value);
        }}
        id={'-' + id}
      />
    </>
  );
};

const App = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button />
        <Button />
      </div>
    </>
  );
};

mountApp({
  app: <App />,
  host: document.body,
});
