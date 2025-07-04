import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { db, collection, addDoc, doc } from "../../firebaseConfig";

export default function Cart() {
    const { items, clearCart, totalQty, totalPrice } = useCart();
    const nav = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        const order = {
            items,
            totalQty,
            totalPrice,
            createdAt: new Date()
        };
        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            clearCart();
            nav(`/checkout/${docRef.id}`);
        } catch (err) {
            console.error("Checkout error:", err);
        }
    };

    if (items.length === 0)
        return <p className="mt-5 text-center">El carrito está vacío</p>;

    return (
        <div className="container mt-4">
            <h2>Tu Carrito</h2>
            <ul className="list-group mb-3">
                {items.map(i => (
                    <li key={i.id} className="list-group-item d-flex justify-content-between">
                        <div>{i.name} x {i.qty}</div>
                        <div>${(i.price * i.qty).toFixed(2)}</div>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>${totalPrice.toFixed(2)}</strong>
                </li>
            </ul>
            <button className="btn btn-danger me-2" onClick={clearCart}>Vaciar carrito</button>
            <button className="btn btn-success" onClick={handleCheckout}>Finalizar compra</button>
        </div>
    );
}