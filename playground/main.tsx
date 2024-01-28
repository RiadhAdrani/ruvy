// import './style.css';
import { DOMEvent, mountApp, useCallback, useState } from '../lib/index.js';

export interface Item {
  text: string;
  creation: number;
}

export type SortType = 'alpha' | 'creation';

export interface SortData {
  type: SortType;
  asc: boolean;
}

const host = document.querySelector('#app') as HTMLElement;

const App = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Array<Item>>([]);

  const [sorting, setSorting] = useState<SortData>({
    asc: false,
    type: 'alpha',
  });

  const add = useCallback(() => {
    if (!text.trim()) {
      alert('empty text !');
      return;
    }

    setText('');
    setItems(v => [...v, { text: text, creation: Date.now() }]);
  }, [text]);

  const onInput = useCallback((e: DOMEvent<InputEvent, HTMLInputElement>) =>
    setText(e.currentTarget.value)
  );

  return (
    <div>
      <div class:add>
        <input value={text} placeholder={'new item'} onInput={onInput} />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
};

mountApp({ host, app: <App /> });
