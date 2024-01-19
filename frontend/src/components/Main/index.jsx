import {Route, Routes} from "react-router-dom"

// Importing all pages
import Home from "../../pages/Home"
import ProductDetails from "../ProductDetails"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
import Cart from "../../pages/Cart"
import Shipping from "../../pages/Shipping"
import ConfirmOrder from "../../pages/ConfirmOrder"
import Payment from "../../pages/Payment"

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/confirm_order" element={<ConfirmOrder />} />
                <Route path="/payment_method" element={<Payment />} />
            </Routes>
        </div>
    )
}

export default Main
