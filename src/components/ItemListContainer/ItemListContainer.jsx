import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig'; // Importa tu configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';

function ItemListContainer() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los productos desde Firestore
    const fetchProducts = async () => {
        try {
            const productsRef = collection(db, 'products'); // Referencia a la colección 'products'
            const querySnapshot = await getDocs(productsRef); // Obtiene los documentos de la colección
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().nombre, // Cambié 'nombre' a 'name'
                category: doc.data().categoria, // Cambié 'categoria' a 'category'
                description: doc.data().descripcion, // Cambié 'descripcion' a 'description'
                image: doc.data().imagen, // Cambié 'imagen' a 'image'
                price: doc.data().precio, // Cambié 'precio' a 'price'
                stock: doc.data().stock, // Añadí 'stock' aquí
            }));

            // Filtra los productos por categoría si es necesario
            const filteredProducts = categoryId
                ? productsList.filter(p => p.category === categoryId)
                : productsList;

            setProducts(filteredProducts); // Actualiza el estado con los productos
            setLoading(false); // Marca la carga como terminada
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false); // Si hay error, termina la carga
        }
    };

    // Llama a la función fetchProducts cuando el componente se monta o cambia el categoryId
    useEffect(() => {
        setLoading(true); // Inicia el estado de carga
        fetchProducts(); // Llama a la función para obtener productos
    }, [categoryId]); // Dependencia: cuando categoryId cambie, se vuelve a ejecutar

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
                <ItemList products={products} /> // Pasa los productos al componente ItemList
            )}
        </div>
    );
}

export default ItemListContainer;