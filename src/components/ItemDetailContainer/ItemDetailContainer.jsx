import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../../firebaseConfig";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, "Celerium/Catálogo/C-001", productId); // Asegúrate de que la ruta sea correcta
        getDoc(docRef).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                const product = {
                    id: snapshot.id,
                    name: data.name,       // Nombre del producto
                    description: data.description, // Descripción
                    image: data.image,     // Ruta de la imagen
                    price: data.price,     // Precio
                    stock: data.stock      // Stock
                };
                setProduct(product);  // Asignamos el producto al estado
            } else {
                setProduct(null); // Si no existe, se asigna null
            }
        }).finally(() => setLoading(false));  // Marcar como no cargando
    }, [productId]);

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="spinner-border text-primary my-5" />
            ) : (
                product ? (
                    <ItemDetail product={product} /> // Pasa el objeto product a ItemDetail
                ) : (
                    <p className="text-danger">Producto no encontrado!</p>
                )
            )}
        </div>
    );
}