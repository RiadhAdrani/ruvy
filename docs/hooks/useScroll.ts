import { createStore, useEffect, useRef } from '../index.js';
import useWindowSize from './useWindowSize.js';

const [getScroll, setScroll] = createStore<Array<number>>('body-scroll', []);

const useScroll = () => {
  const ref = useRef(document.body.querySelector<HTMLDivElement>('#app'));
  const size = useWindowSize();

  useEffect(() => {
    if (!ref.value) return;

    if (size.width > 766) {
      ref.value.style.maxHeight = '';
      ref.value.style.overflowY = '';

      return;
    }

    ref.value.style.maxHeight = getScroll().length > 0 ? '100vh' : '';
    ref.value.style.overflowY = getScroll().length > 0 ? 'hidden' : '';
  }, [getScroll(), size]);

  const add = () => setScroll([...getScroll(), 0]);

  const remove = () => {
    setScroll(getScroll().slice(0, getScroll().length - 1));
  };

  return [add, remove];
};

export default useScroll;
