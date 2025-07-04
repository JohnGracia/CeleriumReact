import { createContext, useContext, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Agregar producto al carrito
    const addToCart = (item, quantity) => {
        const exists = cart.find(p => p.id === item.id);
        if (exists) {
            setCart(cart.map(p =>
                p.id === item.id
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    // Eliminar producto por ID
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Vaciar carrito
    const clearCart = () => {
        setCart([]);
    };

    // Cantidad total de productos
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Precio total
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Actualiza el stock en Firestore cuando se realiza la compra
    const updateStock = async () => {
        const batchErrors = [];

        for (const item of cart) {
            const productRef = doc(db, 'Celerium', 'Catálogo', 'C-001', item.id);
            try {
                await updateDoc(productRef, {
                    stock: item.stock - item.quantity
                });
            } catch (error) {
                batchErrors.push(`Error con ${item.name}: ${error.message}`);
            }
        }

        if (batchErrors.length) {
            throw new Error(batchErrors.join('\n'));
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalQty,
            totalPrice,
            updateStock,
        }}>
            {children}
        </CartContext.Provider>
    );
}