import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (product, qty) => {
        setItems(prev => {
            const idx = prev.findIndex(i => i.id === product.id);
            if (idx !== -1) {
                const updated = [...prev];
                updated[idx].qty += qty;
                return updated;
            }
            return [...prev, { ...product, qty }];
        });
    };

    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
    const clearCart = () => setItems([]);
    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem,
            clearCart, totalQty, totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}