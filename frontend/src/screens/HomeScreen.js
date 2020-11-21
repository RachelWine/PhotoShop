import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';

export function HomeScreen (props) {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [])


  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>{error}</div>
  } else {
    return <ul className="products">
      {
        products.map(product =>
          <li key={product._id}>
            <div className="product">
              <Link to={'/product/' + product._id}>
                <img className="product-image" src={product.img} alt="product" />
              </Link>
              <div className="product-name">
                <Link to={'/product/' + product._id}>{product.name}</Link>
              </div>
              <div className="price">{product.price}</div>
            </div>
          </li>
        )
      }
    </ul>
  }
}