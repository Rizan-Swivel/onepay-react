import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './SingleProduct.module.scss';
import { add } from '../../redux/features/cartSlice';

export default function SingleProduct({ product }) {
    const dispatch = useDispatch();

    const addProduct = async () => {
        // console.log(product);
        dispatch(add(product));
    }

    const { id, title, description, price, quantity } = product;

    return (
        <div className={`card col-md-9 col-lg-8 p-3 mb-4 ${classes.SingleProduct}`}>
            <div className="card-body">
                <h4 className="card-title">{title}</h4>

                <h5 className="card-subtitle mt-3 mb-2 text-muted">
                    {title} are <span className="badge bg-info text-light">LKR {price.toFixed(2)} for each.</span>
                </h5>

                <div className={`${classes.price} d-flex align-items-center`}>
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                        LKR {price.toFixed(2)}
                    </>

                    <button className="btn btn-outline-success ms-auto flex-d align-items-center" onClick={addProduct}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
