import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import { ProductFilter } from './productFilter/productFilter'
import { ProductList } from './productList/productList'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCollection } from '../../customHooks/useFetchCollection'
import { get_price_range, selectProduct, store_products } from '../../redux/slice/productSlice'
import spinnerImg from '../../assets/spinner.jpg'

export const Product = () => {

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

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
          {isLoading ? (
            <img src={spinnerImg} alt='Loading...' style={{ width: '150px' }} className='--center-all' />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  )
}
