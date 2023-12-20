import React, { useEffect } from 'react'
import styles from './Oders.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFetchCollection } from '../../../customHooks/useFetchCollection'
import { selectorOrderHistory, store_orders } from '../../../redux/slice/orderSlice'
import { Loader } from '../../loader/Loader'

export const Oders = () => {
  const { data, isLoading } = useFetchCollection('orders')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(selectorOrderHistory)

  useEffect(() => {
    dispatch(store_orders(data))
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  return (
    <>
      <div className={styles.order}>
        <h2>Your Order History</h2>
        <p>Open an order to leave a <b>ProductReview</b></p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {
              order.length === 0 ? (
                <p>No Order Found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((order, index) => {
                      const { id, orderDate, orderAmmount, orderStatus } = order
                      return (
                        <tr key={id} onClick={() => handleClick(id)}>
                          <td>{index + 1}</td>
                          <td>{orderDate}</td>
                          <td>{id}</td>
                          <td>{'$'}{orderAmmount}</td>
                          <td>
                            <p className={orderStatus !== 'Delivered' ? `${styles.pending}` : `${styles.delivered}`}>{orderStatus}</p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )
            }
          </div>
        </>
      </div>
    </>
  )
}
