import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from './useLocalStorage';
import { useAppSelector } from './store';
import { useGlobalCart } from '../contexts/CartContext';
import { API_URL_LINK } from '../../utils/constants';
import { addLikedProduct, clearAllList, removeLikedProduct, setWishList } from '../../store/whishListSlice';

/**
 * Key for storing wish list data in local storage.
 * @type {string}
 */
const WISH_STORAGE_KEY = 'wish';

/**
 * Custom hook for managing user wish list functionality.
 * @returns {object} Object containing user wish list, addWish, removeWish, and clearAllWishList functions.
 */
export const useWish = () => {
    const dispatch = useDispatch();
    const [userWishList, setUserWishList] = useLocalStorage(WISH_STORAGE_KEY, []);
    const { userLogged } = useGlobalCart();
    const reduxWishList = useAppSelector((state) => state.wish.wishList);

    /**
     * Fetches and sets wish list data when the user is logged in.
     */
    useEffect(() => {
        const getWishlist = async () => {
            if (userLogged == null) {
                dispatch(setWishList(userWishList));
                setUserWishList(reduxWishList);
            } else if (userLogged != undefined) {
                try {
                    const response = await fetch(`${API_URL_LINK}/wishlist/${userLogged.userId}`);
                    const data = await response.json();
                    const wishArray = [];

                    if (response.ok) {
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++) {
                                const element = data[i].productId._id;
                                wishArray[i] = element;
                            }
                            dispatch(setWishList(wishArray));
                        } else {
                            dispatch(setWishList([]));
                        }
                    }
                } catch (error) {
                }
            }
        };

        getWishlist();
    }, [userLogged, reduxWishList, userWishList]);

    /**
     * Updates local wish list when the Redux wish list changes.
     */
    useEffect(() => {
        if (userLogged == null) {
            setUserWishList(reduxWishList);
        }
    }, [reduxWishList]);

    /**
     * Adds a product to the wish list.
     * @param {string} productId - The ID of the product to be added.
     * @returns {object} Object indicating success or error.
     */
    const addWish = async (productId) => {
        try {
            if (userLogged == null) return addProductNotLogged(productId);
            else return addProductLogged(productId);
        } catch (e) {
            return { error: true, message: `There was an error ${e}. Please, try again.` };
        }
    };

    /**
     * Removes a product from the wish list.
     * @param {string} productId - The ID of the product to be removed.
     * @returns {object} Object indicating success or error.
     */
    const removeWish = async (productId) => {
        try {
            if (userLogged == null) return removeProductNotLogged(productId);
            else return removeProductLogged(productId);
        } catch (e) {
            return { error: true, message: `There was an error ${e}. Please, try again.` };
        }
    };

    /**
     * Adds a product to the wish list when the user is not logged in.
     * @param {string} productId - The ID of the product to be added.
     */
    const addProductNotLogged = async (productId) => {
        dispatch(addLikedProduct(productId));
    };

    /**
     * Adds a product to the wish list when the user is logged in.
     * @param {string} productId - The ID of the product to be added.
     */
    const addProductLogged = (productId) => {
        try {
            const uploadWishUser = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userLogged.userId,
                        productId: productId,
                    }),
                };

                await fetch(`${API_URL_LINK}/wishlist`, requestOptions);
            };

            uploadWishUser();
            addProductNotLogged(productId);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Removes a product from the wish list when the user is logged in.
     * @param {string} productId - The ID of the product to be removed.
     */
    const removeProductLogged = async (productId) => {
        try {
            const deleteWishProduct = async () => {
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                await fetch(`${API_URL_LINK}/wishlist/${userLogged.userId}/${productId}`, requestOptions);
            };

            deleteWishProduct();
            removeProductNotLogged(productId);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Removes a product from the wish list when the user is not logged in.
     * @param {string} productId - The ID of the product to be removed.
     */
    const removeProductNotLogged = (productId) => {
        dispatch(removeLikedProduct(productId));
    };

    /**
     * Clears the entire wish list.
     */
    const clearAllWishList = () => {
        dispatch(clearAllList());
        setUserWishList([]);
    };

    return {
        userWishList: reduxWishList,
        addWish,
        removeWish,
        clearAllWishList,
    };
};
