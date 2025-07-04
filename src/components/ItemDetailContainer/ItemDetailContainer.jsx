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
        const docRef = doc(db, "products", productId);
        getDoc(docRef).then(snapshot => {
            if (snapshot.exists()) {
                setProduct({ id: snapshot.id, ...snapshot.data() });
            } else {
                setProduct(null);
            }
        }).finally(() => setLoading(false));
    }, [productId]);

    return (
        <div className="container mt-5">
            {loading
                ? <div className="spinner-border text-primary my-5" />
                : product
                    ? <ItemDetail product={product} />
                    : <p className="text-danger">Producto no encontrado!</p>
            }
        </div>
    );
}