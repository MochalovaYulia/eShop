import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import { useFetchCollection } from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorOrderHistory, store_orders } from '../../redux/slice/orderSlice'
import { Loader } from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { selectedUserId } from '../../redux/slice/authSlice'

export const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection('orders')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(selectorOrderHistory)
  const userID = useSelector(selectedUserId)

  useEffect(() => {
    dispatch(store_orders(data))
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }

  const filteredOrders = order.filter((order) => order.userId === userID)

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>Open an order to leave a <b>ProductReview</b></p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {
              filteredOrders.length === 0 ? (
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
                    {filteredOrders.map((order, index) => {
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
    </section>
  )
}
