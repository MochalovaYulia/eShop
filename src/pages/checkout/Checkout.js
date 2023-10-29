import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculate_cart_total_quantity, calculate_subtotal, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice'
import { selectedEmail } from '../../redux/slice/authSlice'
import { selectBillingAddress, selectShippingAddress } from '../../redux/slice/checkoutSlice'
import { toast } from 'react-toastify'
import { CheckoutForm } from '../../components/checkoutForm/CheckoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

export const Checkout = () => {
  const [message, setMessage] = useState('Initializing Checkout...')
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const customerEmail = useSelector(selectedEmail)

  const shippingAddress = useSelector(selectShippingAddress)
  const billingAddress = useSelector(selectBillingAddress)

  useEffect(() => {
    dispatch(calculate_subtotal())
    dispatch(calculate_cart_total_quantity())
  }, [dispatch, cartItem])

  const description = `eShop mayment: email: ${customerEmail}, Amount: ${totalAmount}`

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItem,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description
      }),
    })
      .then((res) => {
        if(res.ok) {
          return res.json()
        } else {
          return res.json().then((json) => Promise.reject(json))
        }
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((error) => {
        setMessage('Failed to initialize checkout')
        toast.error('Something went wrong')
      })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className='container'>
          {!clientSecret && <h3>{message}</h3>}
        </div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
