
import { useState } from "react";
import ProductList from "./ProductList";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProducts, setShowProducts] = useState(true);

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">TANSTACK QUERY PRACTICE</p>
        <h1>Product Explorer</h1>
        <p>
          Explore products while learning server-state caching with TanStack
          Query.
        </p>
      </header>

      <section className="search-section">
        <label htmlFor="product-search">Search products</label>
        <input
          id="product-search"
          type="search"
          placeholder="Try phone, laptop, perfume..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <p className="search-hint">
          Search results are fetched and cached by search term.
        </p>
      </section>

      <button onClick={() => setShowProducts((previous) => !previous)}>
        {showProducts ? "Hide Products" : "Show Products"}
      </button>

      {showProducts && <ProductList searchTerm={searchTerm} />}
    </main>
  );
}