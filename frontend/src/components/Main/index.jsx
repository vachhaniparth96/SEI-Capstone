import {Route, Routes} from "react-router-dom"

// Importing all pages
import Home from "../../pages/Home"
import ProductDetails from "../ProductDetails"
import Login from "../../pages/Login"
import Register from "../../pages/Register"

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    )
}

export default Main
