import { useEffect, useKey, useRef } from '../index.js';

const useScroll = () => {
  const [scroll, setScroll, getScroll] = useKey<Array<unknown>>('body-scroll', []);
  const ref = useRef(document.body.querySelector<HTMLDivElement>('#app'));

  useEffect(() => {
    if (!ref.value) return;

    ref.value.style.maxHeight = getScroll().length > 0 ? '100vh' : '';
    ref.value.style.overflowY = getScroll().length > 0 ? 'hidden' : '';
  }, scroll);

  const add = () => setScroll([...getScroll(), 0]);

  const remove = () => {
    setScroll(scroll.slice(0, getScroll().length - 1));
  };

  return [add, remove];
};

export default useScroll;
