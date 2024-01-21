import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { caluclateOrderCost } from "../../utilities/orderCost";
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from "../../utilities/api/order";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
	const [method, setMethod] = useState("");

	const navigate = useNavigate();

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);

	const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

	const [
		stripeCheckoutSession,
		{ data: checkoutData, error: checkoutError, isLoading },
	] = useStripeCheckoutSessionMutation();

	console.log(cartItems, "cartItems")
	useEffect(() => {
		if (checkoutData) {
			console.log(checkoutData, "checkoutData?")
			window.location.href = checkoutData?.url;
            console.log(checkoutData)
		}

		if (checkoutError) {
			toast.error(checkoutError?.data?.message);
		}
	}, [checkoutData, checkoutError]);

	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			navigate("/me/orders?order_success=true");
		}
	}, [error, isSuccess]);

	const submitHandler = (e) => {
		e.preventDefault();

		const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
			caluclateOrderCost(cartItems);

		if (method === "Card") {
			// Stripe Checkout
			const orderData = {
				shippingInfo,
				orderItems: cartItems,
				itemsPrice,
				shippingAmount: shippingPrice,
				taxAmount: taxPrice,
				totalAmount: totalPrice,
			};
            
			stripeCheckoutSession(orderData);
		}
	};

	return (
		<div>
			<h1 className="text-center text-3xl text-white mb-5">Payment Method</h1>
			<div className="row wrapper justify-center">
				<div className="col-10 col-lg-5 jce">
					<form
						className="shadow rounded bg-body text-center"
						onSubmit={submitHandler}
					>
						<h2 className="mb-4 text-center">Select Payment Method</h2>

						<div className="form-check mx-24">
							<input
								className="form-check-input"
								type="radio"
								name="payment_mode"
								id="cardradio"
								value="Card"
								onChange={(e) => setMethod("Card")}
							/>
							<label
								className="form-check-label"
								htmlFor="cardradio"
							>
								Card - VISA, MasterCard
							</label>
						</div>

						<button
							id="shipping_btn"
							type="submit"
							className="btn py-2 w-100 hover:bg-yellow-400"
							disabled={isLoading}
						>
							CONTINUE
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethod;
