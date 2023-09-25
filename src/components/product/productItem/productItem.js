import React from 'react'
import styles from './productItem.module.scss'
import { Card } from '../../card/Card'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add_to_cart } from '../../../redux/slice/cartSlice'

export const ProductItem = ({ grid, product, id, name, imageURL, desc, price }) => {
  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(add_to_cart(product))
  }

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...')
      return shortenedText
    }
    return text
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className='--btn --btn-danger' onClick={() => addToCart()}>Add To Card</button>
      </div>
    </Card>
  )
}
