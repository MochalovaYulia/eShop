import React, { useEffect, useState } from 'react'
import styles from './ReviewProduct.module.scss'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedUserId, selectedUserName } from '../../redux/slice/authSlice'
import { selectProduct } from '../../redux/slice/productSlice'
import { Card } from '../card/Card'
import StarRatings from 'react-star-ratings'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useFetchDocument } from '../../customHooks/useFetchDocument'
import spinnerImg from '../../assets/spinner.jpg'

export const ReviewProduct = () => {
  const { id } = useParams()
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState('')
  const [product, setProduct] = useState(null)
  const userID = useSelector(selectedUserId)
  const userName = useSelector(selectedUserName)
  const {document} = useFetchDocument('product', id)

  useEffect(() => {
    setProduct(document)
  }, [document])

  const submitReview = (e) => {
    e.preventDefault()

    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userName,
      userID,
      productID: id,
      rate,
      review,
      reviewDte: date,
      createdAt: Timestamp.now().toDate() 
    }
    try {
      addDoc(collection(db, 'reviews'), reviewConfig)
      toast.success('Review submitted successfully')
      setRate(0)
      setReview('')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Rate This Product</h2>
        {
          product === null ? (
            <img src={spinnerImg} alt='Loading...' style={{width: '80px'}} />
          ) : (
              <>
                <p>
                  <b>Product Name:</b> {product.name}
                </p>
                <img src={product.imageURL} alt={product.name} style={{ width: '100px' }} />
              </>
            )
        }
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarRatings rating={rate} starRatedColor="gold" changeRating={rate => setRate(rate)} />
            <label>Review:</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} cols='30' rows='10' />
            <button type='submit' className='--btn --btn-primary'>Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  )
}
