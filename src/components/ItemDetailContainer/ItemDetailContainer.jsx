import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const ref = doc(db, 'Celerium', 'Catálogo', 'C-001', id);
        getDoc(ref).then((docSnap) => {
            if (docSnap.exists()) {
                setItem({ id: docSnap.id, ...docSnap.data() });
            }
        });
    }, [id]);

    return (
        <div className="container">
            {item ? <ItemDetail item={item} /> : <p>Cargando producto...</p>}
        </div>
    );
};

export default ItemDetailContainer;