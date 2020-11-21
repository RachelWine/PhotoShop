import Cookie from 'js-cookie';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';
import thunk from 'redux-thunk';

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = { cart: { cartItems, payment:{} }};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;