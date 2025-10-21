import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void; //to add item, we need cartItem ts
  removeItem: (id: string) => void;  //to remove item, we need id
  clearCart: () => void;  //to clear our cart, we need nothing
}

// useCartStore fun is a hook defined to access this store in any page we want
// to track the local state about our products, we use persist fun from zustand
// inspect and check in application
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
            // find if item exists in state
          const existing = state.items.find((i) => i.id === item.id);
// if exists , add one more
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
// if not, add the item which came newly to the cart
          return { items: [...state.items, item] };
        }),

        // after removing the items, we should filter out the them to show only the products whose quantity is "> 0"
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart" }
  )
);