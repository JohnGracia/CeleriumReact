import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/cart.svg";

export default function CartWidget() {
    const { totalQty } = useCart();
    return (
        <Link to="/cart" className="position-relative">
            <img src={cartIcon} width="24" alt="Carrito" />
            {totalQty > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {totalQty}
                </span>
            )}
        </Link>
    );
}