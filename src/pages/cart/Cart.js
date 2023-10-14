import React, { useEffect } from 'react'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart, calculate_cart_total_quantity, calculate_subtotal, clear_cart, decrease_to_cart, remove_from_cart, save_url, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { Card } from '../../components/card/Card'
import { selectedIsLoggedIn } from '../../redux/slice/authSlice'

export const Cart = () => {
  const CartItems = useSelector(selectCartItems)
  const CartTotalAmount = useSelector(selectCartTotalAmount)
  const CartTotalQuantity = useSelector(selectCartTotalQuantity)
  const isLoggedIn = useSelector(selectedIsLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const IncreaseCart = (cart) => {
    dispatch(add_to_cart(cart))
  }

  const DecreaseCart = (cart) => {
    dispatch(decrease_to_cart(cart))
  }

  const RemoveCart = (cart) => {
    dispatch(remove_from_cart(cart))
  }

  const ClearCart = () => {
    dispatch(clear_cart())
  }

  useEffect(() => {
    dispatch(calculate_subtotal())
    dispatch(calculate_cart_total_quantity())
    dispatch(save_url(''))
  }, [dispatch, CartItems])

  const url = window.location.href

  const checkout = () => {
    if (isLoggedIn) {
      navigate('/checout-details')
    } else {
      dispatch(save_url(url))
      navigate('/login')
    }
  }


  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {
          CartItems.length === 0 ? (
            <>
              <p>Your cart is currently empty.</p>
              <br />
              <div>
                <Link to='/#products'>&larr; Continue shopping</Link>
              </div>
            </>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>n/s</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    CartItems.map((cart, index) => {
                      const { id, name, imageURL, cartQuantity, price } = cart
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              <b>{name}</b>
                            </p>
                            <img src={imageURL} alt={name} style={{ width: '100px' }} />
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className={styles.count}>
                              <button className='--btn' onClick={() => DecreaseCart(cart)}>-</button>
                              <p>
                                <b>{cartQuantity}</b>
                              </p>
                              <button className='--btn' onClick={() => IncreaseCart(cart)}>+</button>
                            </div>
                          </td>
                          <td>{(price * cartQuantity).toFixed(2)}</td>
                          <td className={styles.icons} onClick={() => RemoveCart(cart)}><FaTrashAlt size={19} color='red' /></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
                <div className={styles.summary}>
                  <button className='--btn --btn-danger' onClick={ClearCart}>Clear Cart</button>
                  <br />
                  <div className={styles.checkout}>
                    <div>
                      <Link to='/#products'>&larr; Continue shopping</Link>
                    </div>
                    <br />
                    <Card cardClass={styles.card}>
                      <p>{`Cart Item(s): ${CartTotalQuantity}`}</p>
                      <div className={styles.text}>
                        <h4>Subtotal</h4>
                        <h3>{`$${CartTotalAmount.toFixed(2)}`}</h3>
                      </div>
                      <p>Taxes and shopping calculated at checkout</p>
                      <button className='--btn --btn-primary --btn-block' onClick={checkout}>Checkout</button>
                    </Card>
                  </div>
                </div>
              </>
          )
        }
      </div>
    </section>
  )
}
