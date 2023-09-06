import React, { useEffect, useState } from 'react'
import styles from './productDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import spinnerImg from '../../../assets/spinner.jpg'

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
            const obj = {
                id: id,
                ...docSnap.data(),
            }
            setProduct(obj)
        } else {
            console.log("No such document!");
        }
    }

    return (
        <section>
            <div className={`container ${styles.product}`}>
                <h2>productDetails</h2>
                <div>
                    <Link to={'/#products'}>&larr; Back to products</Link>
                </div>
                {product === null ? (
                    <img src={spinnerImg} alt='Loading...' />
                ) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <img src={product.imageURL} alt={product.name} />
                            </div>
                            <div className={styles.content}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>{`$${product.price}`}</p>
                                <p>{product.desc}</p>
                                <p>
                                    <b>SKU</b> {product.id}
                                </p>
                                <p>
                                    <b>Brand</b> {product.brand}
                                </p>
                                <div className={styles.count}>
                                    <button className='--btn'>-</button>
                                    <p>1</p>
                                    <button className='--btn'>+</button>
                                </div>
                                <button className='--btn --btn-danger'>ADD TO CART</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
