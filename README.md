# ShopCart

ShopCart is a simple e-commerce shopping cart built with React, TypeScript, Vite and JSON Server. It demonstrates shared cart state using React Context and `useReducer`.

## Features

- Fetches product data from a local JSON Server API.
- Displays product cards with prices.
- Adds products to the cart and increments quantity when the same product is added again.
- Displays the total item count in the cart badge.
- Shows cart items, quantities, line totals and subtotal.
- Removes products from the cart.
- Includes a basic checkout demo trigger.
- Separates cart state and dispatch into two React Contexts.
- Provides custom hooks that throw clear errors when used outside `CartProvider`.
- Includes loading and error states for product fetching.

## Tech Stack

- React
- TypeScript
- Vite
- React Context API
- `useReducer`
- JSON Server 0.17.4

## Prerequisites

- Node.js and npm installed.

## Setup and Run

Open a terminal and navigate to the project directory:

```bash
cd shopcart
npm install
```

### 1. Start the API server

In the first terminal, run:

```bash
npm run server
```

The API runs at `http://localhost:3001`.

Available endpoints:

- `GET http://localhost:3001/products`
- `GET http://localhost:3001/orders`

### 2. Start the frontend

Open a second terminal, navigate to `shopcart` and run:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

The Vite development server proxies `/api` requests to JSON Server. The product endpoint used by the frontend is `/api/products`.

Keep both terminal processes running while using the application.

## Cart State Management

`src/context/CartContext.tsx` contains the cart reducer and two separate contexts:

- **Cart state context:** Provides the current cart items.
- **Cart dispatch context:** Provides the reducer dispatch function.

The reducer handles adding and removing products. Adding an existing product increases its quantity; adding a new product creates a cart item with quantity one. Removing a product removes it from the cart.

Custom hooks, `useCartState` and `useCartDispatch`, provide access to the contexts and throw an error if called outside `CartProvider`.

## Data and Types

`db.json` contains the sample product catalog and an empty `orders` collection.

Shared TypeScript interfaces are defined in `src/types/index.ts`:

- `Product`
- `CartItem`
- `CheckoutResult`

## Checkout Note

The checkout button is a basic demo trigger for this deliverable. It displays the cart item count and total. It does not place a real order or process payments.

## Verification

Build the application with:

```bash
npm run build
```

To verify the API, open `http://localhost:3001/products` or `http://localhost:5173/api/products` while both servers are running.
