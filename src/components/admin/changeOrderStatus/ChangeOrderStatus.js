import React, { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import { Card } from '../../card/Card'
import { Loader } from '../../loader/Loader'
import { toast } from 'react-toastify'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useNavigate } from 'react-router-dom'

export const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const editStatus = (e, id) => {
    e.preventDefault()
    setIsLoading(true)

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      cartItem: order.cartItem,
      orderDate: order.orderDate,
      ordetTime: order.ordetTime,
      shippingAddress: order.shippingAddress,
      orderAmmount: order.orderAmmount,
      orderStatus: status,
      createdAt: order.createdAt,
      editAt: Timestamp.now().toDate()
    }

    try {
      setDoc(doc(db, 'orders', id), orderConfig)
      toast.success('Order status changes successfuly')
      navigate('/admin/orders')
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editStatus(e, id)}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='' disabled>-- Choose one --</option>
                <option value='Order Placed...'>Order Placed...</option>
                <option value='Processing...'>Processing...</option>
                <option value='Shipped...'>Shipped...</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </span>
            <span>
              <button type='submit' className='--btn --btn-primary'>Update Status</button>
            </span>
          </form>
        </Card>
      </div>
    </>
  )
}
