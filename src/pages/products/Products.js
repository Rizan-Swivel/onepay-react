import React, { useEffect, useState } from 'react';

import classes from './Products.module.scss';
import { rawProducts } from '../../data/products';
import Product from '../../models/Product';
import SingleProduct from '../../components/singleProduct/SingleProduct';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch all products and set redux store
        const p = rawProducts.map((p) => new Product({ id: p.id, title: p.title, description: p.description, price: p.price }));
        // console.log(products)
        setProducts(p);

    }, []);

    return (
        <div className={`${classes.Products}`}>
            <span className={classes.heading}>Welcome to the onepay shopping cart</span>

            <div className={`container-fluid px-0 ${classes.wrapper}`}>
                { products.map((p, i) => (
                    <SingleProduct key={i} product={p} />
                )) }
            </div>
        </div>
    )
}
