import { useEffect, useState } from '../index.js';

const useWindowSize = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onresize = () => {
      const { innerHeight: height, innerWidth: width } = window;

      setSize({ height, width });
    };

    window.addEventListener('resize', onresize);

    return () => window.removeEventListener('resize', onresize);
  });

  return size;
};

export default useWindowSize;
