import React, { useEffect, useState } from 'react'
import styles from './productDetails.module.scss'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

export const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        const docRef = doc(db, "product", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    return (
        <div>productDetails</div>
    )
}
