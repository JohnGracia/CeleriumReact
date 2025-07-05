import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemList from '../ItemList/ItemList';

function ItemListContainer() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);  // Estado para almacenar los productos
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga de productos

    // Función para obtener los productos desde Firestore
    const fetchProducts = async () => {
        try {
            const productsRef = collection(db, 'Celerium', 'Catálogo', 'C-001');  // Referencia a la colección

            const querySnapshot = await getDocs(productsRef);

            // Mapear los documentos a un array de productos
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                category: doc.data().category,
                description: doc.data().description,
                image: doc.data().image,
                price: doc.data().price,
                stock: doc.data().stock
            }));

            const filteredProducts = categoryId
                ? productsList.filter(p => p.category === categoryId)
                : productsList;

            setProducts(filteredProducts);  // Actualizar el estado con los productos
            setLoading(false);  // Finalizar el estado de carga

        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);  // Finalizar el estado de carga en caso de error
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">
                {categoryId ? `Categoría: ${categoryId}` : 'Nuestros Productos'}
            </h2>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
                </div>
            ) : (
                products.length > 0 ? (
                    <ItemList products={products} />
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )
            )}
        </div>
    );
}

export default ItemListContainer;