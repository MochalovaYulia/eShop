import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import { ProductFilter } from './productFilter/productFilter'
import { ProductList } from './productList/productList'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCollection } from '../../customHooks/useFetchCollection'
import { selectProduct, store_products } from '../../redux/slice/productSlice'

export const Product = () => {

  const { data } = useFetchCollection('product')
  const products = useSelector(selectProduct)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      store_products({
        products: data,
      })
    );
  }, [dispatch, data])

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>

        <div className={styles.content}>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  )
}
