import "./NavBar.css";
import logo from "../../assets/celerium-galgo.png"
import CartWidget from "../CartWidget/CartWidget";

function NavBar() {
    return (
        <nav className="navbar">
            <div>
                <img className="logo" src={logo} alt="Logo Celerium" />
            </div>

            <ul className="navbar-links">
                <li className="navbar-item">
                    <a href="#">Inicio</a>
                </li>
                <li className="navbar-item">
                    <a href="#">Uniformes</a>
                </li>
                <li className="navbar-item">
                    <a href="#">Accesorios</a>
                </li>
            </ul>
            <CartWidget />
        </nav>
    )
}

export default NavBar