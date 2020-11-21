import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../redux/actions/productActions';

export function ProductsScreen (props) {
    const [modalVisible, setModalVisible] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [count, setCount] = useState('');

    const productsList = useSelector(state => state.productList);
    const { loadin, products, error } = productsList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts())
    }, [successSave, successDelete])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ _id: id, name, price, category, img, description, count }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImg(product.img);
        setDescription(product.description);
        setCount(product.count);
    }

    return <div className="content content-margin">
        <div className="products-header">
            <h3>Products</h3>
            <button onClick={() => openModal({})}>Creat Product</button>
        </div>
        {modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>Creat Product</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <lable htmlFor="name">
                                Name
                     </lable>
                            <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
                        </li>
                        <li>
                            <lable htmlFor="price">
                                Price
                     </lable>
                            <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                        </li>
                        <li>
                            <lable htmlFor="category">
                                Category
                     </lable>
                            <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}></input>
                        </li>
                        <li>
                            <lable htmlFor="img">
                                Image
                     </lable>
                            <input type="text" name="img" value={img} id="img" onChange={(e) => setImg(e.target.value)}></input>
                        </li>
                        <li>
                            <lable htmlFor="description">
                                Description
                     </lable>
                            <input type="text" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></input>
                        </li>
                        <li>
                            <lable htmlFor="count">
                                Count
                     </lable>
                            <input type="text" name="count" value={count} id="count" onChange={(e) => setCount(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button">{id ? "Update" : "Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button">Back</button>
                        </li>
                    </ul>
                </form>
            </div>}

        <div className="products-list">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => openModal(product)}>Edit</button>
                                <button onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
}