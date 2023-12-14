import React, { useState } from 'react'
import styles from './ReviewProduct.module.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedUserId, selectedUserName } from '../../redux/slice/authSlice'
import { selectProduct } from '../../redux/slice/productSlice'
import { Card } from '../card/Card'
import StarRatings from 'react-star-ratings'

export const ReviewProduct = () => {
  const { id } = useParams()
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState('')
  const userID = useSelector(selectedUserId)
  const userName = useSelector(selectedUserName)
  const products = useSelector(selectProduct)

  const product = products.find((item) => item.id === id)

  const submitReview = (e) => {
    e.preventDefault()
    console.log(rate, review);
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Rate This Product</h2>
        <p>
          <b>Product Name:</b> {product.name}
        </p>
        <img src={product.imageURL} alt={product.name} style={{ width: '100px' }} />
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
