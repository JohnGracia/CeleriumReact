import Item from '../Item/Item';

export default function ItemList({ products }) {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map(product => (
                <div key={product.id} className="col">
                    <Item product={product} />
                </div>
            ))}
        </div>
    );
}