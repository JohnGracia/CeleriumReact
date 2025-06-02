const CartWidget = () => {
    return (
        <div className="position-relative">
            <span role="img" aria-label="Cart" style={{ fontSize: '24px' }}>🛒</span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
            </span>
        </div>
    );
};

export default CartWidget;