import Search from "../../utilities/Search";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../utilities/api/user";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";

const Nav = () => {

	const { data } = useGetMeQuery();
	const { cartItems } = useSelector((state) => state.cart);

	return (
		<div>
			<nav className="navbar flex bg-indigo-950">
				<div className="col-12 col-md-3 ps-5">
					<div className="navbar brand pr-5">
						<Link to="/" className="text-white"><img src="/Star_Shop_White.png"></img></Link>
					</div>
				</div>
				<div className="col-12 col-md-6 mt-2 mt-md-0">
					<Search />
				</div>
				<div className=" flex col-12 col-md-3 mt-5 mt-md-0 text-center">
					<div className="flex">
					<Link to="/cart" style={{ textDecoration: "none" }}>
						<p className=" flex ms-7 text-white text-2xl" id="cart">
						<IoCartOutline className="text-3xl"/> {cartItems?.length}
						</p>
					</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
