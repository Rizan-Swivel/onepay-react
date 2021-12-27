import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Product from '../../models/Product';
const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    // add products to redux store
    add: (state, action) => {
        if(!action.payload) {
            return;
        }
        const tempProducts = [...state.products];
        const index = tempProducts.findIndex(p => p.id === action.payload?.id);
        
        if(index !== -1) {
            // product already in the cart. increment the quantity
            tempProducts[index].quantity += 1;
            // if user changes the quantity
            // tempProducts[index].quantity = action.payload?.quantity;
        } else {
            // add new product
            tempProducts.push(action.payload);
        }
        // setTimeout(() => {
            //     state.totalNo = calTotalNo(tempProducts);
            // }, 500);
        state.products = tempProducts;
        toast.success("Product was added to cart.", toastOptions);
       
    },

    // remove products from redux store
    remove: (state, action) => {
        if(state.products.length > 0 && action.payload) {
            state.products = [...state.products].filter(p => p.id !== action.payload);
            toast.success("Product was deleted from cart.", toastOptions);
        }
    },
  },
});

// async call
// export const addAsync = (product) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(add(product));
//     return 'success';
//   }, 5000);
// };

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;
