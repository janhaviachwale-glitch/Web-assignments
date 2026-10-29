import { memo } from 'react';
import { useCartDispatch } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useCartDispatch();

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: product,
    });
  }

  return (
    <article className="product-card">
      <div className="product-icon" aria-hidden="true">
        {product.name.includes('Keyboard')
          ? '⌨️'
          : product.name.includes('Mouse')
            ? '🖱️'
            : product.name.includes('Adapter')
              ? '🔌'
              : '💡'}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">
            ₹{product.price.toFixed(2)}
        </p>

        <button className="primary-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);