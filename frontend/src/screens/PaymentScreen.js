import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../redux/actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';

export function PaymentScreen (props) {
    const [method, setMethod] = useState('');

    const dispatch = useDispatch();

    const save_payment = useCallback(() => savePayment({ method }), [method]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(save_payment({ method }));
        props.history.push('placeorder')
    }

    return <div>
        <CheckoutSteps step1></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Pyment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" value="paypal" name="method" id="method" onChange={(e) => setMethod(e.target.value)}></input>
                            <lable htmlFor="radio">PayPal</lable>
                        </div>
                    </li>
                    <li>
                        <button type="submit" className="button">Continue</button>
                    </li>
                </ul>
            </form>
        </div>

    </div>
}