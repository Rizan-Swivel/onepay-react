import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";

import classes from "./App.module.scss";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Header from "./components/header/Header";

function App() {
  return (
    <Provider store={store}>
      <div className={classes.App}>
        <BrowserRouter>
          <Header />

          <main className="container col-md-9">
            <h2 className={classes.heading}>Onepay Shopping Cart</h2>

            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/" element={<Products />} />
              <Route
                path="*"
                element={
                  <div>
                    <h1>Page Not Found!</h1>
                  </div>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
    </Provider>
  );
}

export default App;
