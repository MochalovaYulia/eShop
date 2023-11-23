import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Contact } from "./pages/contact/Contact";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Reset } from "./pages/auth/Reset";
import { Admin } from "./pages/admin/Admin";
import { AdminOnlyRoute } from "./components/adminOnlyRoute/AdminOnlyRoute";
import { ProductDetails } from "./components/product/productDetails/productDetails";
import { Cart } from "./pages/cart/Cart";
import { CheckoutDetails } from "./pages/checkout/CheckoutDetails";
import { Checkout } from "./pages/checkout/Checkout";
import { CheckoutSuccess } from "./pages/checkout/CheckoutSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />   
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/admin/*" element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>} />
            <Route path="/product-details/:id" element={<ProductDetails/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;