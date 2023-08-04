import React from 'react'
import styles from './Auth.module.scss'
import registerImg from '../../assets/register.png'
import { Card } from '../../components/card/Card'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type='text' placeholder='Email' required />
            <input type='password' placeholder='Password' required />
            <input type='password' placeholder='Confirm Password' required />
            <button className='--btn --btn-primary --btn-block'>Register</button>
            <span className={styles.register}>
              <p>Already an account?</p>
              <Link to='/login'>Login</Link>
            </span>
          </form>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt='register' width='400'/>
      </div>
    </section>
  )
}
