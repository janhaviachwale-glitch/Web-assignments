import { useCartState } from '../context/CartContext';

export default function CartBadge() {
  const cart = useCartState();

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <span className="cart-badge" aria-label={`${itemCount} items in cart`}>
      Cart ({itemCount})
    </span>
  );
}