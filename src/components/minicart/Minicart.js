import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Minicart.module.scss';

function MinicartItem({ product: { id, title, price, quantity } }) {
    return(
        <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="col-7 text-justify">{title}</span>
            <div className="col d-flex justify-content-between">
                <span className="badge bg-secondary" style={{ width: '25px' }}>{quantity}</span>
                <span className="text-right">LKR {price.toFixed(2)}</span>
            </div>
        </div>
    );
}

export const calTotalPrice = (products) => {
    let total = 0;
    products.forEach(p => {
        total += p.price * p.quantity;
    });
    return total;
}

export default function Minicart() {
    const navigate = useNavigate();
    const products = useSelector((state) => state.cart.products);
    const totalPrice = calTotalPrice(products);
    // const dispatch = useDispatch();

    return (
        <div className={`p-3 d-flex flex-column ${classes.Minicart}`}>
            {products.length > 0 
            ? <>
                {products.map((p, i) => <MinicartItem key={i} product={p} />)}

                <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                    <h5 className="fw-bold">Total</h5>
                    <h5 className="fw-bold">LKR {totalPrice.toFixed(2) || 0}</h5>
                </div>

                <button className="btn btn-success ms-auto fw-bold" onClick={() => navigate("/cart")}>Go to Cart</button>
            </>
            : <h5 className="fw-bold m-auto">Cart is empty!</h5>
            }
        </div>
    )
}
