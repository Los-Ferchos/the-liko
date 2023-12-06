import { createContext, useContext } from 'react';
import { useWish } from '../hooks/useWish';

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const wish = useWish();

  return <WishContext.Provider value={wish}>{children}</WishContext.Provider>;
};

export const useGlobalWish = () => {
  return useContext(WishContext);
};
