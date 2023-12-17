import React, { useEffect } from 'react'
import styles from './Home.module.scss'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import { InfoBox } from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, store_products } from '../../../redux/slice/productSlice'
import { calc_total_order_amount, selectorOrderAmount, selectorOrderHistory, store_orders } from '../../../redux/slice/orderSlice'
import { useFetchCollection } from '../../../customHooks/useFetchCollection'

  const earningsIcon = <AiFillDollarCircle size={30} color='b624ff' />
  const productsIcon = <BsCart4 size={30} color='1f93ff' />
  const ordersIcon = <FaCartArrowDown size={30} color='orangered' />

export const Home = () => {
  const products = useSelector(selectProduct)
  const orders = useSelector(selectorOrderHistory)
  const totalOrderAmount = useSelector(selectorOrderAmount)
  const dispatch = useDispatch() 

  const fbProducts = useFetchCollection('product')
  const {data} = useFetchCollection('orders')
  
  useEffect(() => {
    dispatch(
      store_products({
        products: fbProducts.data
      })
    )
    dispatch(store_orders(data))
    dispatch(calc_total_order_amount())
  }, [dispatch, fbProducts, data])

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={'Earnings'}
          count={`$${totalOrderAmount}`}
          icon={earningsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={'Products'}
          count={products.length}
          icon={productsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={'Orders'}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
    </div>
  )
}
