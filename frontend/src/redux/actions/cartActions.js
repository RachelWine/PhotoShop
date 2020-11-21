import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT } from '../constants/constants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('/api/products/' + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
            id: data._id,
            name: data.name,
            img: data.img,
            price: data.price,
            count: data.count,
            qty
            }
        });

        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems),1);

    } catch (err) {
        console.log(err);
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems), 1);
}

const savePayment = (data) => async (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, savePayment }; 