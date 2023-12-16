import React, { useEffect, useState } from 'react'
import styles from './productDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import spinnerImg from '../../../assets/spinner.jpg'
import { add_to_cart, calculate_cart_total_quantity, decrease_to_cart, selectCartItems } from '../../../redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchDocument } from '../../../customHooks/useFetchDocument'
import { Card } from '../../card/Card'
import StarRatings from 'react-star-ratings'
import { useFetchCollection } from '../../../customHooks/useFetchCollection'

export const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { document } = useFetchDocument('product', id)
    const { data } = useFetchCollection('reviews')
    console.log(data);

    const filteredReview = data.filter((review) => review.productID === id)

    const cart = cartItems.find((cart) => cart.id === id)
    const isCartAdded = cartItems.findIndex((cart) => {
        return cart.id === id
    })

    useEffect(() => {
        setProduct(document);
    }, [document]);

    const addToCart = (product) => {
        dispatch(add_to_cart(product))
        dispatch(calculate_cart_total_quantity())
    }

    const decreaseCart = (product) => {
        dispatch(decrease_to_cart(product))
        dispatch(calculate_cart_total_quantity())
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
                                {
                                    isCartAdded < 0 ? null : (
                                        <div className={styles.count}>
                                            <button className='--btn' onClick={() => decreaseCart(product)}>-</button>
                                            <p>{cart.cartQuantity}</p>
                                            <button className='--btn' onClick={() => addToCart(product)}>+</button>
                                        </div>
                                    )
                                }
                                <button className='--btn --btn-danger' onClick={() => addToCart(product)}>ADD TO CART</button>
                            </div>
                        </div>
                    </>
                )}
                <Card cardClass={styles.card}>
                    <div>
                        <h3>Reviews Product</h3>
                        {
                            filteredReview.length === 0 ? (
                                <p>There are no reviews for this product yet.</p>
                            ) : (
                                <>
                                    {
                                        filteredReview.map((item, index) => {
                                            const { rate, review, userName, reviewDte } = item
                                            return (
                                                <div key={index} className={styles.review}>
                                                    <StarRatings rating={rate} starRatedColor='gold' />
                                                    <p>{review}</p>
                                                    <span>
                                                        <b>{reviewDte}</b>
                                                    </span>
                                                    <br />
                                                    <span>
                                                        <b>by: {userName}</b>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </Card>
            </div>
        </section>
    )
}
