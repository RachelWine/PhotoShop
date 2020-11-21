import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../redux/actions/productActions';

export function ProductScreen (props) {
    const { history, match } = props;
    const [qty, setQty] = useState([1]);

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(match.params.id));
    }, []);

    const handleAddToCart = () => {
        history.push('/cart/' + match.params.id + '?qty=' + qty)
    }

    return <div>
        <div className="back">
            <Link to="/">Back</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.img} alt="product"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    Price: <b>${product.price}</b>
                                </li>
                                <li>
                                    Description:
                                        <div>{product.description}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price : {product.price}
                                </li>
                                <li>
                                    Status : {product.count > 0 ? "In stock" : "Unavailable"}
                                </li>
                                <li>
                                    Qty :
                                        <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.count).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                                    </select>
                                </li>
                                <li>
                                    {product.count > 0 && <button onClick={handleAddToCart} className="button"> Add to Cart</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }
    </div>
}