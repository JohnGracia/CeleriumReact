import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function ItemDetail({ item }) {
    const { addToCart } = useCart();
    const [count, setCount] = useState(1);
    const [added, setAdded] = useState(false);

    const increment = () => count < item.stock && setCount(count + 1);
    const decrement = () => count > 1 && setCount(count - 1);

    const handleAdd = () => {
        if (count > 0 && count <= item.stock) {
            addToCart(item, count);
            setAdded(true); // Ocultar controles y mostrar opciones
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-7">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p><strong>Precio:</strong> ${item.price}</p>
                    <p><strong>Stock disponible:</strong> {item.stock}</p>

                    {!added ? (
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <div className="btn-group" role="group">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={decrement}
                                >
                                    -
                                </button>
                                <span className="btn btn-light">{count}</span>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={increment}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="btn btn-success"
                                onClick={handleAdd}
                                disabled={item.stock === 0}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 d-flex gap-3">
                            <Link to="/cart" className="btn btn-primary">
                                Ir al carrito
                            </Link>
                            <Link to="/" className="btn btn-outline-secondary">
                                Seguir comprando
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}