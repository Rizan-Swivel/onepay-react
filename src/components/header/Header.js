import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Header.module.scss';
import Minicart from '../minicart/Minicart';

export default function Header() {
    const location = useLocation();
    const products = useSelector((state) => state.cart.products);
    
    const calTotalNo = (products) => {
        let totalQuantity = 0;
        products.forEach(p => {
            totalQuantity += p.quantity;
        })
        return totalQuantity;
    }

    const totalNo = calTotalNo(products);

    return (
        <div className={classes.Header}>
            <nav className={`navbar navbar-expand-md navbar-light bg-white fixed-top p-0`}>
                <div className="container-fluid col-md-9">
                    <Link className="navbar-brand" to="/">
                        <img src={require('../../assets/img/logo.png')} className="img-fluid" alt='logo' />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav w-100 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item dropdown ms-md-auto">
                                <a className={`nav-link ${classes.cartLink}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                        Cart
                                        <span className="badge bg-secondary">
                                            {totalNo || 0}
                                        </span>
                                    </div>
                                </a>

                                
                                <ul 
                                    className={`dropdown-menu dropdown-menu-end ${classes.minicart} ${location.pathname === "/cart" ? classes.hidden : ""}`}
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Minicart />
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
