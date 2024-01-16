import { useGetProductsQuery } from "../utilities/api/products";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import AppPagination from "../utilities/Pagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const params  = { page }
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
				<div className="col-6 col-md-12">
					<h1 id="products_heading" className="text-secondary">
						Latest Products
					</h1>
					<section id="products" className="mt-5">
						<div className="row">
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
