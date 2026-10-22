# TanStack Query – Product Listing

## Overview

This project is a React application built to practise TanStack Query. It fetches product data from a REST API and demonstrates how queries, caching, loading states and error handling work in a real application.

The application includes a product listing, a search field, a manual refresh option and React Query DevTools to inspect queries and cached data.

## Features

- Fetches products from the DummyJSON REST API.
- Displays product details, including the name, description, price, image and rating.
- Searches products by name or keyword.
- Uses separate query keys for the default product list and search results.
- Displays a loading message while the initial request is in progress.
- Keeps existing product cards visible during a background refresh.
- Shows an error message and a retry option if a request fails.
- Reuses cached data when returning to a query while its data is still fresh.
- Includes a Show Products/Hide Products control to test cache reuse when the product component is mounted again.
- Includes React Query DevTools to inspect query keys and query status.

## Technologies Used

- React
- Vite
- JavaScript
- TanStack Query (`@tanstack/react-query`)
- TanStack Query DevTools
- CSS
- DummyJSON API

## API Used

The application uses the DummyJSON products API.

- All products: https://dummyjson.com/products
- Search products: https://dummyjson.com/products/search?q=laptop

The search endpoint receives the search term entered in the application.

## How TanStack Query Is Used

### QueryClient and QueryClientProvider

The `QueryClient` is created in `src/main.jsx` and provided to the application through `QueryClientProvider`. This makes the query client available to components that use TanStack Query.

React Query DevTools is also included to help inspect query state and cached data during development.

### Fetching products

The product listing uses `useQuery()` in `src/ProductList.jsx`. The API request is handled by the `fetchProducts()` function in `src/api/products.js`.

### Query keys and search

The default product list uses this query key:

```js
["products"]
```

When a search term is entered, the query key includes that term:

```js
["products", { search: "laptop" }]
```

This allows TanStack Query to keep the results for different searches separate in the cache.

### Caching configuration

The product query uses these settings:

```js
staleTime: 30 * 1000,
gcTime: 5 * 60 * 1000,
```

`staleTime` keeps successfully fetched data fresh for 30 seconds. `gcTime` determines how long inactive query data can remain in the cache before it becomes eligible for garbage collection.

### Loading, fetching, and error states

The product component uses `isPending`, `isFetching`, `isError`, and `isSuccess` to handle the different query states.

The initial loading state is shown before products are available. During a background refetch, existing data stays visible while the request runs. If a request fails, the application displays an error message and a Try Again button.

## Testing

The following scenarios were tested manually:

1. Loaded products from the API and checked the displayed product details.
2. Opened React Query DevTools and verified the product query.
3. Verified the initial loading message.
4. Searched for different terms and checked the corresponding query keys.
5. Returned to a previously searched term within 30 seconds and verified that cached results appeared immediately.
6. Hid and showed the product component again within the configured stale time and verified that the cached data was reused.
7. Clicked Refresh Products and checked that existing product cards remained visible during the refetch.
8. Switched the browser network to Offline and searched for a new term to trigger an API error.
9. Restored the network and used Try Again to verify that products loaded successfully.
