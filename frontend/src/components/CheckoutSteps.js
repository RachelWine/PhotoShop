import React from 'react';

export function CheckoutSteps (props) {
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Payment</div>
        <div className={props.step2 ? 'active' : ''}>Confirm Order</div>
    </div>
}