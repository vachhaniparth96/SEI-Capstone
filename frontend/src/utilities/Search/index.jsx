import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        if(keyword?.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate('/');
            toast.error("Please enter a valid keyword");
        }

        }
	return (
		<div>
			<form action="search_action" method="get" onSubmit={submit}>
				<div className="input-group">
					<input
						id="search_field"
						className="form-control"
						type="text"
						placeholder="Search for products"
						name="keyword"
						value={keyword}
                        onChange={(e)=> setKeyword(e.target.value)}
					></input>
					<button id="search_btn" className="btn bg-yellow-400 hover:bg-yellow-400" type="submit">
						Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
