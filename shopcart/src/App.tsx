import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import './App.css';

function ShopCartContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <section className="hero">
          <p className="eyebrow">BETTER EVERYDAY ESSENTIALS</p>
          <h1>Make room for<br />things that work.</h1>
          <p className="hero-description">
            A considered collection of everyday tech, designed to make
            your workspace feel a little more like yours.
          </p>
          <a className="hero-link" href="#catalog">
            Explore the collection <span aria-hidden="true">→</span>
          </a>
          <div className="hero-decoration" aria-hidden="true">
            <span>SC</span>
          </div>
        </section>

        <Catalog />
      </main>

      <footer className="site-footer">
        <span>ShopCart</span>
        <span>Thoughtfully selected. Ready for your everyday.</span>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShopCartContent />
    </CartProvider>
  );
}