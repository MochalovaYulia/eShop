import React, { useState } from 'react'
import styles from './Auth.module.scss'
import resetImg from '../../assets/forgot.png'
import { Card } from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail  } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast, ToastContainer } from 'react-toastify'
import { Loader } from '../../components/loader/Loader'

export const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassowrd = (e) => {
    e.preventDefault();
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Check your email a reset link')
        setIsLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });
    
  }

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt='reset' width='400' />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassowrd}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email' required />
              <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
              <div className={styles.links}>
                <p>- <Link to='/login'>Login</Link></p>
                <p>- <Link to='/register'>Register</Link></p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  )
}
