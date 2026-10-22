
const API_URL = "https://dummyjson.com";

export async function fetchProducts(searchTerm = "") {
  const trimmedSearch = searchTerm.trim();

  const endpoint = trimmedSearch
    ? `${API_URL}/products/search?q=${encodeURIComponent(trimmedSearch)}`
    : `${API_URL}/products`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Unable to fetch products. Please try again.");
  }

  const result = await response.json();

  return result.products;
}
