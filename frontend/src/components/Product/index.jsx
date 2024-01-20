/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
const Product = ({product, keyword}) => {

	return (
		<div>
			<div>
				<div className="card p-3 rounded">
					<img
                                    className="card-img-top mx-auto w-auto h-32 object-fit"
                                    src={product?.images[0].url}
                                    alt={product?.name}
                                />
					<div className="card-body ps-3 d-flex justify-content-center flex-column">
						<h5 className="card-title">
							<Link to={`/product/${product?._id}`}>{product?.name}</Link>
						</h5>
						<div className="ratings mt-auto d-flex">
							<StarRatings rating={product?.ratings} starRatedColor="gold" starDimension="20px" starSpacing="1px" name="rating" numberOfStars={5}/>
							<span id="no_of_reviews" className="pt-2 ps-2">
								{" "}
								({product?.numOfReviews}){" "}
							</span>
						</div>
						<p className="card-text mt-2">${product?.price}</p>
						<Link to={`/product/${product?._id}`} id="view_btn" className=" card hover:bg-yellow-400 btn btn-block">
						View Details
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
