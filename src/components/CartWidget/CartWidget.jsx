const CartWidget = () => {
    return (
        <div style={{ position: 'relative' }}>
            🛒
            <span style={{
                position: 'relative',
                top: -10,
                right: 6,
                backgroundColor: 'orange',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px'
            }}>
                3
            </span>
        </div>
    );
};

export default CartWidget;
