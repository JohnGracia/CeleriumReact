import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db, doc, getDoc } from "../../firebaseConfig";

export default function Checkout() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const docRef = doc(db, "orders", orderId);
            const snap = await getDoc(docRef);
            if (snap.exists()) setOrder({ id: snap.id, ...snap.data() });
        };
        fetch();
    }, [orderId]);

    if (!order) return <p className="mt-5 text-center">Buscando orden...</p>;

    return (
        <div className="container mt-5">
            <h2>Compra Confirmada</h2>
            <p>¡Gracias por tu compra! Tu ID de orden es:</p>
            <pre>{order.id}</pre>
            <Link className="btn btn-primary" to="/">Volver al inicio</Link>
        </div>
    );
}