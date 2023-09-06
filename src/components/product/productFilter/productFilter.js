import React from 'react'
import styles from './productFilter.module.scss'

export const ProductFilter = () => {
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        <button>All</button>
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name='brand'>
          <option value='all'>All</option>
        </select>
      </div>
      <h4>Price</h4>
      <div className={styles.price}>
        <p>1500</p>
        <input type='range' name='price' min={100} max={10000} />
      </div>
      <br />
      <button className='--btn --btn-danger'>Clear Filters</button>
    </div>
  )
}
