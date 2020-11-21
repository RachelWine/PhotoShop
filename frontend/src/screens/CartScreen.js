import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

export function CartScreen (props) {
    const { location, history, match } = props;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const add_to_cart = useCallback(() => addToCart(productId, qty), [productId, qty]);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(add_to_cart(productId, qty));
        }
    }, []);

    const checkoutHandler = () => {
        history.push("/payment")
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shoping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>Cart is empty</div> :
                        cartItems.map(item =>
                            <li>
                                <div className="cart-image"><img src={item.img} alt="product" /></div>
                                <div className="cart-name">
                                    <Link to={"/products/" + item.id}><div>{item.name}</div></Link>
                                    <div>
                                        Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, e.target.value))}>
                                            {[...Array(item.count).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                                        </select>
                                        <button className="button" type="button" onClick={() => removeFromCartHandler(item.id)}>
                                            Delete
                                    </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>)
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal {cartItems.reduce((pre, curr) => pre + curr.qty, 0)} items
                :
                $ {cartItems.reduce((pre, curr) => pre + curr.price * curr.qty, 0)}
            </h3>
            <button className="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                Go to Checkout
            </button>

        </div>
    </div>
}