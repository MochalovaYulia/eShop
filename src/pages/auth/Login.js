import React, { useState } from 'react'
import styles from './Auth.module.scss'
import loginImg from '../../assets/login.png'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../components/card/Card'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import { selectPreviousUrl } from '../../redux/slice/cartSlice'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const previousUrl = useSelector(selectPreviousUrl)

    const redirectUser = () => {
        if(previousUrl.includes('cart')) {
            return navigate('/cart')
        } else {
            navigate('/')
        }
        
    }

    const LoginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false)
                redirectUser()
                toast.success('Login Successfully!')
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    const provider = new GoogleAuthProvider();

    const SingInWithGoogle = (e) => {
        e.preventDefault()
        setIsLoading(true)

        signInWithPopup(auth, provider)
            .then((result) => {
                setIsLoading(false)
                redirectUser()
                toast.success('Login Successfully!')
            }).catch((error) => {
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
                    <img src={loginImg} alt='login' width='400' />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={LoginUser}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email' required />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                            <button className='--btn --btn-primary --btn-block'>Login</button>

                            <div className={styles.links}>
                                <Link to='/reset'>Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                            <button onClick={SingInWithGoogle} type='submit' className='--btn --btn-danger --btn-block'><FaGoogle color='#fff' /> Login With Google</button>
                            <span className={styles.register}>
                                <p>Don't have an account?</p>
                                <Link to='/register'>Register</Link>
                            </span>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}
