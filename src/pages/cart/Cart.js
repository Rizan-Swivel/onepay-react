import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { sha256 } from 'js-sha256';

import classes from './Cart.module.scss'
import { remove } from '../../redux/features/cartSlice';
import { calTotalPrice } from '../../components/minicart/Minicart';

// environment variables
const paymentUrl = process.env.REACT_APP_PAYMENT_URL;
const appId = process.env.REACT_APP_APP_ID;
const appToken = process.env.REACT_APP_APP_TOKEN;
const salt = process.env.REACT_APP_SALT;
// const salt2 = bcrypt.genSaltSync(10);
const transactionRedirectUrl = process.env.REACT_APP_TRANSACTION_REDIRECT_URL;

function CartItem({ product: { id, title, price, quantity } }) {
    const dispatch = useDispatch();

    return(
        <div className={`d-flex flex-column mb-4 p-3 ${classes.CartItem}`}>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="w-75 text-justify">{title}</h4>
                <h5><span className="badge bg-secondary">{quantity}</span></h5>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <span>Unit price: <span className="badge bg-info text-light text-justify mb-1">LKR {price.toFixed(2)}</span></span>
                    <h6 className="fw-bold">Sub Total: LKR {Number(price * quantity).toFixed(2)}</h6>
                </div>
    
                <button className="btn btn-outline-danger" onClick={() => dispatch(remove(id))}>Remove</button>
            </div>
            
        </div>
    );
}


export default function Cart() {
    const products = useSelector((state) => state.cart.products);
    const totalAmount = calTotalPrice(products);

    // form fields
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const onChange = (e) => {
        const val = e.target.value;

        switch(e.target.name) {
            case 'cartFormFName':
                setFName(val);
                break;
            case 'cartFormLName':
                setLName(val);
                break;
            case 'cartFormPhone':
                setPhone(val);
                break;
            case 'cartFormEMail':
                setEmail(val);
                break;
            default:
                return;
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let data = { 
            transaction_redirect_url: transactionRedirectUrl,
            customer_email: "chamathrathnayake95@gmail.com", 
            customer_phone_number: "+94778869070", 
            reference: new Date().getTime(), 
            amount: 100, 
            app_id: appId, 
            is_sdk: 2,
            sdk_type: 1,
            authorization: appToken,
        };
        
        let hash = sha256.create();
        hash = hash.update(JSON.stringify(data) + salt);
        hash = hash.hex();
        // const hash = await genHash(JSON.stringify(data) + salt);
        console.log(hash);

        delete data.authorization;
        data["customer_first_name"] = "chamath";
        data["customer_last_name"] = "rathnayake";

        axios.post(`${paymentUrl}${hash}`, {
            'method': 'POST',
            'headers': {
              'Authorization': appToken,
              'Content-Type': 'application/json'
            },
            body: data
        })
        .then(res => {
            console.log(res.data);
            if(res.data && res.data.status === 1000) {
                // window.location.href = transactionRedirectUrl;

            } else {

            }
        })
        .catch(err => {
            console.log('Error', err);
        })


    }

    // const genHash = async(string) => {
    //     const utf8 = new TextEncoder().encode(string);
    //     const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    //     const hashArray = Array.from(new Uint8Array(hashBuffer));
    //     const hashHex = hashArray
    //         .map((bytes) => bytes.toString(16).padStart(2, '0'))
    //         .join('');
    //     return hashHex;
    // }

    return (
        <div className={`d-flex flex-lg-row justify-content-lg-between flex-sm-column flex-sm-column-reverse ${classes.Cart}`}>
            {products.length > 0 
            ? <>
                <div className={`col-lg-6 d-flex flex-column mb-sm-5 mb-lg-0 ${classes.products}`}>
                    {products.map((p, i) => <CartItem key={i} product={p} />)}
                </div>

                <div className={`col-lg-5 d-flex flex-column mb-sm-5 mb-lg-0 p-4 ${classes.form}`}>
                    <form className="d-flex flex-column">
                        <div className="mb-3">
                            <label htmlFor="cartFormFName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="cartFormFName" name="cartFormFName" placeholder="Your firstname"
                                onChange={onChange} value={fname} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cartFormLName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="cartFormLName" name="cartFormLName" placeholder="Your lastname" 
                                 onChange={onChange} value={lname} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cartFormPhone" className="form-label">Phone Number</label>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">+94</span>
                                <input type="text" id="cartFormPhone" name="cartFormPhone" className="form-control" placeholder="## ### ####" aria-label="phoneNumber" aria-describedby="addon-wrapping" 
                                     onChange={onChange} value={phone} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cartFormEMail" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="cartFormEMail" name="cartFormEMail" placeholder="yourname@example.com" 
                                 onChange={onChange} value={email} />
                        </div>

                        <h5 className="ms-auto my-3">Total Amount: LKR {totalAmount.toFixed(2)}</h5>

                        <button className="btn btn-success ms-auto mt-2 mb-3" type="submit" onClick={onSubmit}>PAY VIA ONEPAY</button>
                    </form>
                </div>
            
            </>
            : <h2 className="fw-bold m-auto">Cart is Empty</h2>}
        </div>
    )
}
