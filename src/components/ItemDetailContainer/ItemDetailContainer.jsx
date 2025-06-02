import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulación de base de datos de productos
    const allProducts = [
        // Uniformes
        {
            id: 1,
            name: 'Licra Pierna Larga',
            category: 'Uniformes',
            description: 'Licra deportiva larga para entrenamiento de patinaje.',
            image: '/assets/licra-larga.jpg',
            price: 45.00
        },
        {
            id: 2,
            name: 'Licra Pierna Corta',
            category: 'Uniformes',
            description: 'Licra corta ideal para competiciones y clima cálido.',
            image: '/assets/licra-corta.jpg',
            price: 38.00
        },

        // Protecciones
        {
            id: 3,
            name: 'Casco de Patinaje',
            category: 'Protecciones',
            description: 'Casco ligero y resistente para uso recreativo y profesional.',
            image: '/assets/casco.jpg',
            price: 60.00
        },
        {
            id: 4,
            name: 'Rodilleras',
            category: 'Protecciones',
            description: 'Rodilleras acolchadas para entrenamiento seguro.',
            image: '/assets/rodilleras.jpg',
            price: 25.00
        },
        {
            id: 5,
            name: 'Coderas',
            category: 'Protecciones',
            description: 'Coderas ergonómicas con ajuste elástico.',
            image: '/assets/coderas.jpg',
            price: 20.00
        },

        // Accesorios
        {
            id: 6,
            name: 'Morral Deportivo',
            category: 'Accesorios',
            description: 'Morral resistente para llevar implementos de patinaje.',
            image: '/assets/morral.jpg',
            price: 55.00
        },
        {
            id: 7,
            name: 'Cordones de Alta Resistencia',
            category: 'Accesorios',
            description: 'Cordones especiales para botas de patinaje profesional.',
            image: '/assets/cordones.jpg',
            price: 8.00
        },
        {
            id: 8,
            name: 'Llaves Profesionales',
            category: 'Accesorios',
            description: 'Herramientas para ajustes de ejes y ruedas.',
            image: '/assets/llaves.jpg',
            price: 18.00
        }
    ];

    const fetchProductById = (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const found = allProducts.find(p => p.id === parseInt(id));
                resolve(found);
            }, 800);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetchProductById(productId)
            .then((result) => {
                setProduct(result);
                setLoading(false);
            });
    }, [productId]);

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : product ? (
                <div className="fade-in">
                    <ItemDetail product={product} />
                </div>
            ) : (
                <p className="text-center text-danger">Producto no encontrado.</p>
            )}
        </div>
    );
}

export default ItemDetailContainer;