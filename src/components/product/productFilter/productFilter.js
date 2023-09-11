import React, { useEffect, useState } from 'react'
import styles from './productFilter.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct } from '../../../redux/slice/productSlice'
import { filter_by_brand, filter_by_category } from '../../../redux/slice/filterSlice'

export const ProductFilter = () => {
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const products = useSelector(selectProduct)
  const dispatch = useDispatch()

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category))
  ]

  const allBrand = [
    'All',
    ...new Set(products.map((product) => product.brand))
  ]
  
  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(filter_by_category({products, category: cat}))
  }

 useEffect(() => {
  dispatch(filter_by_brand({products, brand}))
 }, [dispatch, products, brand])

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button 
              key={index} 
              type='button' 
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          )
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrand.map((brand, index) => {
            return (
              <option key={index} value={brand}>{brand}</option>
            )
          })}
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
