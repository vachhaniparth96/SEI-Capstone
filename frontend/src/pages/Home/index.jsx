import { useGetProductsQuery } from "../../utilities/api/products"
import Product from "../../components/Product";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import AppPagination from "../../utilities/Pagination";
import { useSearchParams } from "react-router-dom";
import Filters from "../../components/Filters";

const Home = () => {

    let [searchParams] = useSearchParams();

    //Defining various search/filter parameters and obtaining them using the searchParams method
    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min")
    const max = searchParams.get("max")
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");

    const params  = { page, keyword }

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);

	const { data, isLoading, error, isError} = useGetProductsQuery(params);
	console.log(data, isLoading);
    
    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isError])
        
    if (isLoading) return <Loading />;
	return (
		<div>
			{/* <MetaData title={"Buy Best Products Online"} /> */}
			<div className="row">
                    <div className="col-6 col-md-3 mt-5 mb-5">
                        <Filters />
                    </div>
				<div className="col-6 col-md-9">
					<h1 id="products_heading" className="text-secondary pt-5 text-white">
						{keyword ? `Search Results for "${keyword}". Total Results: ${data?.productsCount}` : "All Products"}
					</h1>
					<section id="products" className="mt-3">
						<div className="grid grid-cols-3 gap-4">
							{data?.products?.map((product,idx) => (
								<Product product={product} key={idx} />
							))}
						</div>
					</section>

                    <AppPagination resultLimit={data?.resultLimit} productsCount={data?.productsCount}/>
				</div>
			</div>
		</div>
	);
};

export default Home;
