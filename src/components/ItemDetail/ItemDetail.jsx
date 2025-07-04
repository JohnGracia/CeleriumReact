import { useState } from "react";
import { useCart } from "../Context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";

export default function ItemDetail({ product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (qty) => {
        addItem(product, qty);
        setAdded(true);
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: "30rem" }}>
            <img src={require(`../../assets/${product.image}`)} className="card-img-top" alt={product.name} />
            <div className="card-body text-center">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>${product.price}</strong></p>
                {product.stock > 0 ? (
                    <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
                ) : <p className="text-danger">Producto sin stock</p>}
                {added && (
                    <div className="mt-3">
                        <p className="text-success">Producto agregado al carrito</p>
                        <Link to="/cart" className="btn btn-primary">Ir al carrito</Link>
                    </div>
                )}
            </div>
        </div>
    );
}