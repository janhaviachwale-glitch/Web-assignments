import CartBadge from './CartBadge';

interface ToolbarProps {
  onOpenCart: () => void;
}

export default function Toolbar({ onOpenCart }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div>
        <span className="brand-mark">S</span>
        <span className="brand-name">ShopCart</span>
      </div>

      <button className="cart-button" onClick={onOpenCart}>
        <CartBadge />
      </button>
    </div>
  );
}