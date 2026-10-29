import { useCartDispatch, useCartState } from '../context/CartContext';

export default function CartItemsList() {
  const cart = useCartState();
  const dispatch = useCartDispatch();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <span aria-hidden="true">🛍️</span>
        <h3>Your cart is empty</h3>
        <p>Add something you love from the collection.</p>
      </div>
    );
  }

  return (
    <div className="cart-items-list">
      {cart.map((item) => (
        <article className="cart-item" key={item.id}>
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>
              ₹{item.price.toFixed(2)} × {item.quantity}
            </p>
            <strong>
              ₹{(item.price * item.quantity).toFixed(2)}
            </strong>
          </div>

          <button
            className="remove-button"
            onClick={() =>
              dispatch({
                type: 'REMOVE_ITEM',
                payload: { productId: item.id },
              })
            }
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </article>
      ))}
    </div>
  );
}