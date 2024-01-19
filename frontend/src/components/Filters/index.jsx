/* eslint-disable react/jsx-key */
import {useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { priceParams } from "../../utilities/priceParams";
import { categories } from "../../utilities/categories";
import StarRatings from "react-star-ratings";

const Filters = () => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const navigate = useNavigate();

    let [searchParams] = useSearchParams();

    const priceFilter = (e) => {
        e.preventDefault();

        searchParams = priceParams(searchParams, "min", min);
        searchParams = priceParams(searchParams, "max", max);

        const pagePath = window.location.pathname + '?' + searchParams.toString();
        navigate(pagePath)
    }

    const categoryAndRatingFilter = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name);

        checkboxes.forEach((el) => {
            if(el !== checkbox) {
                el.checked = false;
            }
        });

        if(checkbox.checked === false) {
            //Deletes category filter from query
            if(searchParams.has(checkbox.name)) {
                searchParams.delete(checkbox.name);
                const pagePath = window.location.pathname + '?' + searchParams.toString();
                navigate(pagePath)
            }
        } else {
            //Adding filter to query
            if(searchParams.has(checkbox.name)) {
                //sets new filter value if it is already there
                searchParams.set(checkbox.name, checkbox.value);
            } else {
                //appends new filter if not
                searchParams.append(checkbox.name, checkbox.value);
            }
            const pagePath = window.location.pathname + '?' + searchParams.toString();
            navigate(pagePath)
        }
    }

    const checkHandler = (checkboxType, checkboxValue) => {
        const value = searchParams.get(checkboxType);
        if(value === checkboxValue) {
            return true;
        }
        return false;
    }

	return (
		<div>
			<div className="border p-3 filter bg-white ">
				<h3>Filters</h3>
				<hr />
				<h5 className="filter-heading mb-3">Price</h5>
				<form
					id="filter_form"
					className="px-2"
					action="your_action_url_here"
					method="get"
                    onSubmit={priceFilter}
				>
					<div className="row">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Min ($)"
								name="min"
								value={min}
                                onChange={(e) => setMin(e.target.value)}
							/>
						</div>
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Max ($)"
								name="max"
								value={max}
                                onChange={(e) => setMax(e.target.value)}
							/>
						</div>
						<div className="col">
							<button type="submit" className="btn btn-primary text-black hover:bg-yellow-400">
								GO
							</button>
						</div>
					</div>
				</form>
				<hr />
				<h5 className="mb-3">Category</h5>
                {categories.map((category, idx) => (
				<div className="form-check" key={idx}>
					<input
						className="form-check-input"
						type="checkbox"
						name="category"
						id="check4"
						value={category}
                        defaultChecked={checkHandler("category", category)}
                        onClick={(e) => categoryAndRatingFilter(e.target)}
					/>
					<label className="form-check-label" htmlFor="check4">
						{" "}
						{category}{" "}
					</label>
				</div>
                ))}
				<hr />
				<h5 className="mb-3">Ratings</h5>
                {[5, 4, 3, 2, 1].map((rating) =>
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						name="ratings"
						id="check7"
						value={rating}
                        defaultChecked={checkHandler("ratings", rating?.toString())}
                        onClick={(e) => categoryAndRatingFilter(e.target)}
					/>
					<label className="form-check-label" htmlFor="check7">
						<StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="1px"
                        />
					</label>
				</div>
                )}
			</div>
		</div>
	);
};

export default Filters;
