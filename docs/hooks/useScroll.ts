import { createComposable, useEffect, useRef, useState } from '../index.js';
import useWindowSize from './useWindowSize.js';

const useScroll = createComposable('scroll', () => {
  const [scroll, setScroll] = useState<Array<number>>([]);

  const ref = useRef(document.body.querySelector<HTMLDivElement>('#app'));
  const size = useWindowSize();

  useEffect(() => {
    if (!ref.value) return;

    if (size.width > 766) {
      ref.value.style.maxHeight = '';
      ref.value.style.overflowY = '';

      return;
    }

    ref.value.style.maxHeight = scroll.length > 0 ? '100vh' : '';
    ref.value.style.overflowY = scroll.length > 0 ? 'hidden' : '';
  }, [scroll, size]);

  const add = () => setScroll([...scroll, 0]);

  const remove = () => {
    setScroll(scroll.slice(0, scroll.length - 1));
  };

  return [add, remove];
});

export default useScroll;
