import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CartWidget() {
    const { totalQty } = useCart();

    return (
        <Link to="/cart" className="btn btn-outline-secondary position-relative">
            <FaShoppingCart size={20} />
            {totalQty > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQty}
                </span>
            )}
        </Link>
    );
}