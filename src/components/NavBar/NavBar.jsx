import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/celerium-galgo.png';
import CartWidget from '../CartWidget/CartWidget';

function NavBar() {
    const categories = ['Uniformes', 'Protecciones', 'Accesorios'];  // Lista de categorías

    return (
        <nav className="bg-light border-bottom py-2">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">

                    {/* Logo + Título (Izquierda) */}
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Logo" height="40" className="me-2" />
                        <h1 className="fs-5 m-0">Celerium Store</h1>
                    </div>

                    {/* Categorías centradas */}
                    <ul className="nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        {categories.map((category) => (
                            <li className="nav-item" key={category}>
                                <Link className="nav-link" to={`/category/${category}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* Carrito (Derecha) */}
                    <div className="d-flex">
                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;