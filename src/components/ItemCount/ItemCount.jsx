import { useState } from 'react';

function ItemCount({ stock, initial, onAdd }) {
    const [count, setCount] = useState(initial);

    const increment = () => count < stock && setCount(count + 1);
    const decrement = () => count > 1 && setCount(count - 1);

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <div className="btn-group" role="group">
                <button className="btn btn-outline-secondary" onClick={decrement}>-</button>
                <span className="btn btn-light">{count}</span>
                <button className="btn btn-outline-secondary" onClick={increment}>+</button>
            </div>
            <button
                className="btn btn-success mt-2"
                onClick={() => onAdd(count)}
                disabled={stock === 0}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ItemCount;
