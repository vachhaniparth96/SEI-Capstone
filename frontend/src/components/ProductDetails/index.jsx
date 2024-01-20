/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../utilities/api/products";
import StarRatings from "react-star-ratings";
import Loading from "../../components/Loading";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../utilities/cartSlice";

const ProductDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const [quantity, setQuantity] = useState(1);
	const [activeImg, setActiveImg] = useState("");

	const { data, isLoading, error, isError } = useGetProductDetailsQuery(
		params?.id
	);

	const product = data;

	useEffect(() => {
		setActiveImg(
			product?.images[0]
				? product?.images[0]?.url
				: "/images/default_product.png"
		);
	}, [product]);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [isError]);

	const increaseQty = () => {
		const count = document.querySelector(".count");
		if (count.valueAsNumber >= product?.stock) {
			return;
		}
		const qty = count.valueAsNumber + 1;
		setQuantity(qty);
	};

	const decreaseQty = () => {
		const count = document.querySelector(".count");
		if (count.valueAsNumber <= 1) {
			return;
		}
		const qty = count.valueAsNumber - 1;
		setQuantity(qty);
	};

	const sendToCart = () => {
		const cartItem = {
			product: product?._id,
			name: product?.name,
			stock: product?.stock,
			price: product?.price,
			image: product?.images[0]?.url,
			quantity,
		};
		dispatch(setCartItem(cartItem));
		toast.success("Item added to cart");
	};

	console.log(data);

	if (isLoading) return <Loading />;

	return (
		<div className="row d-flex justify-content-around text-white">
			<div className="col-12 col-lg-5 img-fluid" id="product_image">
				<div className="p-3">
					<img
						className="d-block w-100"
						src={activeImg}
						alt={product?.name}
						width="300"
						height="350"
					/>
				</div>
				<div className="row justify-content-start mt-5">
					{product?.images?.map((img) => (
						<div className="col-2 ms-4 mt-2">
							<a role="button">
								<img
									className={`d-block border rounded p-3 cursor-pointer ${
										img.url === activeImg
											? "border-warning"
											: ""
									} `}
									height="100"
									width="100"
									src={img?.url}
									alt={img?.url}
									onClick={(e) => setActiveImg(img.url)}
								/>
							</a>
						</div>
					))}
				</div>
			</div>

			<div className="col-12 col-lg-5 mt-5">
				<h3>{product?.name}</h3>
				<p id="product_id">Product # {product?._id}</p>

				<hr />

				<div className="d-flex">
					<StarRatings
						rating={product?.ratings}
						starRatedColor="gold"
						numberOfStars={5}
						name="rating"
						starDimension="24px"
						starSpacing="1px"
					/>
					<span id="no-of-reviews" className="pt-1 ps-2">
						{" "}
						({product?.numOfReviews} Reviews){" "}
					</span>
				</div>
				<hr />

				<p id="product_price">${product?.price}</p>
				<div className="stockCounter d-inline">
					<span
						className="btn btn-danger minus"
						onClick={decreaseQty}
					>
						-
					</span>
					<input
						type="number"
						className="form-control count d-inline w-auto text-center m-2"
						value={quantity}
						readOnly
					/>
					<span
						className="btn btn-primary plus"
						onClick={increaseQty}
					>
						+
					</span>
				</div>
				<button
					type="button"
					id="cart_btn"
					className="btn btn-primary d-inline ms-4 text-black bg-yellow-400 hover:bg-yellow-400"
					disabled={product?.stock === 0}
					onClick={sendToCart}
				>
					Add to Cart
				</button>

				<hr />

				<p>
					Status:{" "}
					<span
						id="stock_status"
						className={
							product?.stock > 0 ? "greenColor" : "redColor"
						}
					>
						{product?.stock > 0 ? "In Stock" : "Out of Stock"}
					</span>
				</p>

				<hr />

				<h4 className="mt-2">Description:</h4>
				<p>{product?.description}</p>
				<hr />
				<p id="product_seller mb-3">
					Sold by: <strong>{product?.seller}</strong>
				</p>

				<div className="alert alert-danger my-5" type="alert">
					Login to post your review.
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
