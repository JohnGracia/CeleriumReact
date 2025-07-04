function ItemList({ products }) {
    return (
        <div className="row">
            {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                    <div className="card">
                        <img src={product.image} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList;