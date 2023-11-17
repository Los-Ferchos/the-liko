import { useState, useEffect } from 'react';

/**
 * Custom hook that provides the current window width and height.
 *
 * @example
 * // Example usage of useWindowSize hook
 * const { width, height } = useWindowSize();
 *
 * @returns {Object} An object containing the current window width and height.
 * @property {number} width - The current window width.
 * @property {number} height - The current window height.
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
