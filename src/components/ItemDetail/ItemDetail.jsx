import { useCart } from "../Context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

export default function ItemDetail({ product }) {
    const { addItem } = useCart();
    const handleAdd = (qty) => addItem(product, qty);

    return (
        <div className="card mx-auto" style={{ maxWidth: "30rem" }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body text-center">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>${product.price}</strong></p>
                {product.stock > 0
                    ? <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
                    : <p className="text-danger">Producto sin stock</p>
                }
            </div>
        </div>
    );
}