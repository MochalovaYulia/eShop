import React, { useEffect, useState } from 'react'
import styles from './OrderDetails.module.scss'
import { useFetchDocument } from '../../../customHooks/useFetchDocument'
import { Link, useParams } from 'react-router-dom'
import spinnerImg from '../../../assets/spinner.jpg'
import { ChangeOrderStatus } from '../changeOrderStatus/ChangeOrderStatus'

export const OrderDetails = () => {
  const [order, setOrder] = useState(null)
  const {id} = useParams()
  const {document} = useFetchDocument('orders', id)

  useEffect(() => {
    setOrder(document)
  }, [document])
  
  return (
    <>
      <div className={styles.table}>
        <h2>Order Details</h2>
        <div>
          <Link to='/admin/orders'>&larr; Back to orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt='loading...' style={{width:'50px'}}/>
        ) : (
          <>
            <p>
              <b>Order ID:</b> {order.id}
            </p>
            <p>
              <b>Order Amount:</b> ${order.orderAmmount}
            </p>
            <p>
              <b>Order Status:</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address:</b> 
              <br />
              Address: {order.shippingAddress.line1}
              <br />
              Country: {order.shippingAddress.country}
            </p>
          </>
        )}
        <br />
        {order && order.cartItem && (
          <table> 
          <thead>
            <tr>
              <th>s/n</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItem.map((cart, index) => {
              const {id, name, price, imageURL, cartQuantity} = cart
              return (
                <tr key={id}>
                  <td>
                    <b>{index + 1}</b>
                  </td>
                  <td>
                    <p>
                      <b>{name}</b>
                    </p>
                    <img
                      src={imageURL}
                      alt={name}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{price}</td>
                  <td>{cartQuantity}</td>
                  <td>
                    {(price * cartQuantity).toFixed(2)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> 
        )}
        <ChangeOrderStatus order={order} id={id}/>
      </div>
    </>
  )
}
