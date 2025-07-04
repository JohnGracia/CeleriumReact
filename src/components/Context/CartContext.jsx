import { createContext, useContext, useState, useEffect } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => localStorage.setItem("cart", JSON.stringify(items)), [items]);

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

    const removeItem = id => setItems(prev => prev.filter(i => i.id !== id));
    const clearCart = () => setItems([]);

    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    const updateStock = async () => {
        for (let item of items) {
            const productRef = doc(db, "Celerium", "Catálogo", "C-001", item.id);
            await runTransaction(db, async (t) => {
                const docSnap = await t.get(productRef);
                if (!docSnap.exists()) throw "Producto no existe";
                const newStock = docSnap.data().stock - item.qty;
                if (newStock < 0) throw "Sin stock suficiente";
                t.update(productRef, { stock: newStock });
            });
        }
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalQty, totalPrice, updateStock }}>
            {children}
        </CartContext.Provider>
    );
}