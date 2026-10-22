import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api/products";

export default function ProductList({ searchTerm }) {
  const {
    data: products,
    isPending,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: searchTerm.trim()
  ? ["products", { search: searchTerm.trim() }]
  : ["products"],
    queryFn: () => fetchProducts(searchTerm),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isPending) {
    return <p className="status-message">Loading products...</p>;
  }

  if (isError) {
    return (
      <div className="status-message error-message" role="alert">
        <p>Could not load products: {error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="products-section">
      <div className="products-heading">
        <h2>Products</h2>

        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing..." : "Refresh Products"}
        </button>
      </div>

      {isFetching && (
        <p className="background-status" role="status">
          Updating product data...
        </p>
      )}

      {isSuccess && products.length === 0 && (
        <p>No products found. Try another search term.</p>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
