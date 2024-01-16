import { useGetProductsQuery } from "../utilities/api/products";
import Product from "../components/Product";
import Loading from "../components/Loading";

const Home = () => {
	const { data, isLoading } = useGetProductsQuery();
	console.log(data, isLoading);
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
				</div>
			</div>
		</div>
	);
};

export default Home;
