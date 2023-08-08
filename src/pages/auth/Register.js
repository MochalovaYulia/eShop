import React, { useState } from 'react'
import styles from './Auth.module.scss'
import registerImg from '../../assets/register.png'
import { Card } from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'
import { Loader } from '../../components/loader/Loader'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                placeholder='Email'
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                required
              />
              <input
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                type='password'
                placeholder='Confirm Password'
                required
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
              <span className={styles.register}>
                <p>Already an account?</p>
                <Link to='/login'>Login</Link>
              </span>
            </form>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt='register' width='400' />
        </div>
      </section>
    </>
  )
}
