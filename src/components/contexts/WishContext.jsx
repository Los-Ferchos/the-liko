import { createContext, useContext } from 'react';
import { useWish } from '../hooks/useWish';

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const cart = useWish();

  return <WishContext.Provider value={cart}>{children}</WishContext.Provider>;
};

export const useGlobalWish = () => {
  return useContext(WishContext);
};
