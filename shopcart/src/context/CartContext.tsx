import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } };

interface CartContextProviderProps {
  children: ReactNode;
}

const CartStateContext = createContext<CartItem[] | undefined>(undefined);
const CartDispatchContext = createContext<
  Dispatch<CartAction> | undefined
>(undefined);

function cartReducer(
  state: CartItem[],
  action: CartAction,
): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter(
        (item) => item.id !== action.payload.productId,
      );

    default:
      return state;
  }
}

export function CartProvider({
  children,
}: CartContextProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState(): CartItem[] {
  const context = useContext(CartStateContext);

  if (context === undefined) {
    throw new Error(
      'useCartState must be used within a CartProvider',
    );
  }

  return context;
}

export function useCartDispatch(): Dispatch<CartAction> {
  const context = useContext(CartDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useCartDispatch must be used within a CartProvider',
    );
  }

  return context;
}