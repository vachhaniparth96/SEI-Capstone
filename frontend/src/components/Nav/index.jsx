import React from "react";
import Search from "../../utilities/Search";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../utilities/api/user";
import { useSelector } from "react-redux";

const Nav = () => {

	const { data } = useGetMeQuery();
	const { cartItems } = useSelector((state) => state.cart);
	

	console.log("user", data)

	return (
		<div>
			<nav className="navbar row">
				<div className="col-12 col-md-3 ps-5">
					<div className="navbar brand">
						<Link to="/" className="text-black">logo here</Link>
					</div>
				</div>
				<div className="col-12 col-md-6 mt-2 mt-md-0">
					<Search />
				</div>
				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
				<Link to="/cart" style={{ textDecoration: "none" }}>
					<span className="ms-3" id="cart">
						Cart
					</span>
					<span className="ms-1" id="cart_count">
						{cartItems?.length}
					</span>
				</Link>
					<div className="ms-4 dropdown">
						<button
							className="btn dropdown-toggle text-white"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span>User Dropdown Menu</span>
						</button>
						<div
							className="dropdown-menu w-100"
							aria-labelledby="dropdownMenuButton"
						>
							<p className="dropdown-item">Dashboard</p>
							<p className="dropdown-item">Orders</p>
							<p className="dropdown-item">Profile</p>
							<p className="dropdown-item">Logout</p>
						</div>
						<Link to="/login" className="btn ms-4">Login</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
