import Toolbar from './Toolbar';

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  return (
    <header className="site-header">
      <Toolbar onOpenCart={onOpenCart} />
    </header>
  );
}