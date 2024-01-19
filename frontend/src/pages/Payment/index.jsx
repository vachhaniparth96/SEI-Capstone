import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import { caluclateOrderCost } from "../../utilities/orderCost";
import {
	useCreateNewOrderMutation,
	useStripeCheckoutSessionMutation,
} from "../../utilities/api/order";
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

	useEffect(() => {
		if (checkoutData) {
			window.location.href = checkoutData?.url;
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
			navigate("/");
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
			<CheckoutSteps shipping confirmOrder payment />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow rounded bg-body"
						onSubmit={submitHandler}
					>
						<h2 className="mb-4">Select Payment Method</h2>

						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="payment_mode"
								id="codradio"
								value="COD"
								onChange={(e) => setMethod("COD")}
							/>
							<label
								className="form-check-label"
								htmlFor="codradio"
							>
								Card - VISA, MasterCard
							</label>
						</div>

						<button
							id="shipping_btn"
							type="submit"
							className="btn py-2 w-100"
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
