import { useCart } from "../Context/CartContext";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const {
        cart,
        removeFromCart,
        clearCart,
        totalQty,
        totalPrice,
        updateStock,
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            await updateStock(); // Descuenta stock en Firestore
            const order = {
                items: cart,
                totalQty,
                totalPrice,
                createdAt: new Date(),
            };
            const docRef = await addDoc(collection(db, "orders"), order);
            clearCart();
            navigate(`/checkout/${docRef.id}`);
        } catch (err) {
            console.error("Error al procesar la compra:", err);
            alert("No se pudo completar la compra: " + err.message);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar tu compra.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">Tu carrito</h2>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end">
                <p><strong>Cantidad total:</strong> {totalQty}</p>
                <p><strong>Precio total:</strong> ${totalPrice}</p>
                <div className="d-flex gap-2 justify-content-end">
                    <button className="btn btn-outline-danger" onClick={clearCart}>
                        Vaciar carrito
                    </button>
                    <button className="btn btn-success" onClick={handleCheckout}>
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    );
}