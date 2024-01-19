import React from "react";
import Search from "../../utilities/Search";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../utilities/api/user";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";

const Nav = () => {

	const { data } = useGetMeQuery();
	const { cartItems } = useSelector((state) => state.cart);
	

	console.log("user", data)

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
					{/* <div className="ms-4 dropdown">
						<button
							className="btn dropdown-toggle text-white"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span>Dropdown Menu</span>
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
					</div> */}
				</div>
			</nav>
		</div>
	);
};

export default Nav;
