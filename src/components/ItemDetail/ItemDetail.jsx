import ItemCount from '../ItemCount/ItemCount';

function ItemDetail({ product }) {
    return (
        <div className="card mx-auto" style={{ maxWidth: '30rem' }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <ItemCount stock={10} initial={1} onAdd={(qty) => alert(`Agregaste ${qty} al carrito`)} />
            </div>
        </div>
    );
}

export default ItemDetail;