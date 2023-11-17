import { useEffect, useState } from 'react';

/**
 * A custom React hook for managing state in localStorage with automatic synchronization.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {*} initialValue - The initial value for the state.
 * @returns {Array} - A stateful value and a function to update it.
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;
    return storedValue;
  });

  /**
   * Update the localStorage when the value changes.
   *
   * @param {*} newValue - The new value to be stored.
   */
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    /**
     * Handle changes in localStorage and update the state.
     *
     * @param {StorageEvent} event - The storage event.
     */
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [value, setStoredValue];
}

export default useLocalStorage;
