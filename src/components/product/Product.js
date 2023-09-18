import React, { useEffect, useState } from 'react'
import styles from './Product.module.scss'
import {FaCogs} from 'react-icons/fa'
import { ProductFilter } from './productFilter/productFilter'
import { ProductList } from './productList/productList'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCollection } from '../../customHooks/useFetchCollection'
import { get_price_range, selectProduct, store_products } from '../../redux/slice/productSlice'
import spinnerImg from '../../assets/spinner.jpg'

export const Product = () => {
  const [showFilter, setShowFilter] = useState(false)
  const { data, isLoading } = useFetchCollection('product')
  const products = useSelector(selectProduct)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      store_products({
        products: data,
      })
    );

    dispatch(
      get_price_range({
        products: data
      })
    )
  }, [dispatch, data])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}`: `${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
          {isLoading ? (
            <img src={spinnerImg} alt='Loading...' style={{ width: '150px' }} className='--center-all' />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color='orangered' />
            <p>
              <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
