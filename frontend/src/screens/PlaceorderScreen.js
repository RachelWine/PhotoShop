import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';

export function PlaceorderScreen (props) {
    const cart = useSelector(state => state.cart);
    const { cartItems, payment } = cart;
    if (!payment.method) {
        props.history.push('/payment');
    }

    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="placeorder">
            <div>
                <h1> THANK YOU !</h1>
            </div>
            <div className="placeorder-info">
                <div>
                    <h3>Payment</h3>
                    <div>Payment Method: {cart.payment.method}</div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>Shoping Cart</h3>
                            <div>Price</div>
                        </li>
                        {
                            cartItems.length === 0 ?
                                <div>Cart is empty</div> :
                                cartItems.map(item =>
                                    <li>
                                        <div className="cart-image"><img src={item.img} alt="product" /></div>
                                        <div className="cart-name">
                                            <Link to={"/products/" + item.product}><div>{item.name}</div></Link>
                                            <div>Qty: {item.qty}</div>
                                        </div>
                                        <div className="cart-price">${item.price}</div>
                                    </li>)
                        }
                    </ul>
                </div>

            </div>

        </div>
    </div>
}