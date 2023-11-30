import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from './useLocalStorage';
import { useAppSelector } from './store';
import { useGlobalCart } from '../contexts/CartContext';

const WISH_STORAGE_KEY = 'wish';

export const useWish = () => {
    const dispatch = useDispatch();
    const [userWishList, setUserWishList] = useLocalStorage(WISH_STORAGE_KEY, []);
    const { userLogged } = useGlobalCart();

    const reduxWishList = useAppSelector((state) => state.wish.wishList);

    /**
     * Effect to update local storage when the cart items in Redux change.
     */
    useEffect(() => {
        if(userLogged == null)
            setUserWishList(reduxWishList);
    }, [reduxWishList]);



    return {
        userWishList: reduxWishList,
    };
};