import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../utilities/cartSlice";
import { FaRegTrashCan } from "react-icons/fa6";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems } = useSelector((state) => state.cart);

	const increseQty = (item, quantity) => {
		const newQty = quantity + 1;

		if (newQty > item?.stock) return;

		setItemToCart(item, newQty);
	};

	const decreseQty = (item, quantity) => {
		const newQty = quantity - 1;

		if (newQty <= 0) return;

		setItemToCart(item, newQty);
	};

	const setItemToCart = (item, newQty) => {
		const cartItem = {
			product: item?.product,
			name: item?.name,
			price: item?.price,
			image: item?.image,
			stock: item?.stock,
			quantity: newQty,
		};

		dispatch(setCartItem(cartItem));
	};

	const removeCartItemHandler = (id) => {
		dispatch(removeCartItem(id));
	};

	const checkoutHandler = () => {
		navigate("/shipping");
	};

	return (
		<div className="text-white">
			<h2 className="mt-5 pb-3">
				Your Cart: <b>{cartItems?.length} items</b>
			</h2>

			<div className="row d-flex justify-content-between pt-">
				<div className="col-12 col-lg-8">
					{cartItems?.map((item) => (
						<>
							<hr />
							<div className="cart-item pt-3 pb-3" data-key="product1">
								<div className="row">
									<div className="col-4 col-lg-3">
										<img
											src={item?.image}
											alt="Laptop"
											height="90"
											width="115"
										/>
									</div>
									<div className="col-5 col-lg-3">
										<Link to={`/products/${item?.product}`}>
											{" "}
											{item?.name}{" "}
										</Link>
									</div>
									<div className="col-4 col-lg-2 mt-4 mt-lg-0">
										<p id="card_item_price">
											${item?.price}
										</p>
									</div>
									<div className="col-4 col-lg-4 mt-4 mt-lg-0">
										<div className="stockCounter d-inline">
											<span
												className="btn btn-danger minus"
												onClick={() =>
													decreseQty(
														item,
														item.quantity
													)
												}
											>
												{" "}
												-{" "}
											</span>
											<input
												type="number"
												className="form-control count d-inline w-16 text-center m-1"
												value={item?.quantity}
												readonly
											/>
											<span
												className="btn btn-primary plus"
												onClick={() =>
													increseQty(
														item,
														item.quantity
													)
												}
											>
												{" "}
												+{" "}
											</span>
										</div>
										<i
											id="delete_cart_item"
											className="fa fa-trash btn btn-danger m-1"
											onClick={() =>
												removeCartItemHandler(
													item?.product
												)
											}
										><FaRegTrashCan className="text-2xl"/>
										</i>
									
									</div>
								</div>
							</div>
							<hr />
						</>
					))}
				</div>

				<div className="col-12 col-lg-3 my-4">
					<div id="order_summary">
						<h4 className="pb-2">Order Summary</h4>
						<hr />
						<p className="pt-2">
							Units:{" "}
							<span className="order-summary-values">
								{cartItems?.reduce(
									(acc, item) => acc + item?.quantity,
									0
								)}
							</span>
						</p>
						<p>
							Est. total:{" "}
							<span className="order-summary-values">
								$
								{cartItems
									?.reduce(
										(acc, item) =>
											acc + item?.quantity * item.price,
										0
									)
									.toFixed(2)}
							</span>
						</p>
						<hr />
						<button
							id="checkout_btn"
							className="btn btn-primary w-100 mt-2"
							onClick={checkoutHandler}
						>
							Check out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
