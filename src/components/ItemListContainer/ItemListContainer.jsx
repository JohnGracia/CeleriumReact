import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';

function ItemListContainer() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
const allProducts = [
    // Uniformes
    {
        id: 1,
        name: 'Licra Pierna Larga',
        category: 'Uniformes',
        description: 'Licra deportiva larga para entrenamiento de patinaje.',
        image: '/assets/licra-larga.jpg'
    },
    {
        id: 2,
        name: 'Licra Pierna Corta',
        category: 'Uniformes',
        description: 'Licra corta ideal para competiciones y clima cálido.',
        image: '/assets/licra-corta.jpg'
    },

    // Protecciones
    {
        id: 3,
        name: 'Casco de Patinaje',
        category: 'Protecciones',
        description: 'Casco ligero y resistente para uso recreativo y profesional.',
        image: '/assets/casco.jpg'
    },
    {
        id: 4,
        name: 'Rodilleras',
        category: 'Protecciones',
        description: 'Rodilleras acolchadas para entrenamiento seguro.',
        image: '/assets/rodilleras.jpg'
    },
    {
        id: 5,
        name: 'Coderas',
        category: 'Protecciones',
        description: 'Coderas ergonómicas con ajuste elástico.',
        image: '/assets/coderas.jpg'
    },

    // Accesorios
    {
        id: 6,
        name: 'Morral Deportivo',
        category: 'Accesorios',
        description: 'Morral resistente para llevar implementos de patinaje.',
        image: '/assets/morral.jpg'
    },
    {
        id: 7,
        name: 'Cordones de Alta Resistencia',
        category: 'Accesorios',
        description: 'Cordones especiales para botas de patinaje profesional.',
        image: '/assets/cordones.jpg'
    },
    {
        id: 8,
        name: 'Llaves Profesionales',
        category: 'Accesorios',
        description: 'Herramientas para ajustes de ejes y ruedas.',
        image: '/assets/llaves.jpg'
    }
];

        return new Promise((resolve) => {
            setTimeout(() => {
                if (categoryId) {
                    resolve(allProducts.filter(p => p.category === categoryId));
                } else {
                    resolve(allProducts);
                }
            }, 1000); // 1 segundo de simulación
        });
    };

    useEffect(() => {
        setLoading(true); // comienza carga
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false); // termina carga
            });
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">
                {categoryId ? `Category: ${categoryId}` : 'Nuestros Productos'}
            </h2>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ItemList products={products} />
            )}
        </div>
    );
}

export default ItemListContainer;