import { useCartState } from '../context/CartContext';
import CartItemsList from './CartItemsList';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const cart = useCartState();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) {
    return null;
  }

  function handleCheckout() {
    if (cart.length === 0) {
      return;
    }

    window.alert(
      `Checkout ready!\n${cart.reduce((sum, item) => sum + item.quantity, 0)} item(s)\nTotal: ₹${total.toFixed(2)}`,
    );
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <h2 id="cart-title">Shopping cart</h2>
          </div>

          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close shopping cart"
          >
            ×
          </button>
        </div>

        <CartItemsList />

        <div className="drawer-footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>

          <button
            className="primary-button checkout-button"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <p className="checkout-note">
            Checkout is a baseline demo trigger for Deliverable 1.
          </p>
        </div>
      </aside>
    </div>
  );
}