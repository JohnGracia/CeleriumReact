import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

function Item({ product }) {
    const { addToCart } = useCart();

    const handleAdd = (qty) => {
        if (qty > 0 && qty <= product.stock) {
            addToCart(product, qty);
            alert(`${qty} unidad(es) de "${product.name}" agregadas al carrito.`);
        }
    };

    return (
        <div className="card h-100">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>

                <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />

                <Link to={`/item/${product.id}`} className="btn btn-outline-primary mt-2">
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
}

export default Item;