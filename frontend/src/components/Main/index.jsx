import {Route, Routes} from "react-router-dom"

// Importing all pages
import Home from "../../Home"
import ProductDetails from "../ProductDetails"

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </div>
    )
}

export default Main
