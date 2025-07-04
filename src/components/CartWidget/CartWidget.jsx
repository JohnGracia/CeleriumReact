import { useCart } from "../Context/CartContext";
import cartIcon from "../../assets/cart.svg";  // Aquí

export default function CartWidget() {
    const { totalQty } = useCart();

    return (
        <div className="position-relative">
            <img src={cartIcon} width="24" alt="Carrito" />
            {totalQty > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {totalQty}
                </span>
            )}
        </div>
    );
}
