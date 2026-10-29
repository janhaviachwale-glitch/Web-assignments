import { useEffect, useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/products', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <section className="catalog-section" id="catalog">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Find your next favourite.</h2>
        </div>
        <p className="section-description">
          Thoughtfully selected essentials for your everyday setup.
        </p>
      </div>

      {loading && <p role="status">Loading products...</p>}

      {error && (
        <div className="error-message" role="alert">
          <p>Could not load products: {error}</p>
          <button
            className="secondary-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}