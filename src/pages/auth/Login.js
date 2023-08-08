import React, { useState } from 'react'
import styles from './Auth.module.scss'
import loginImg from '../../assets/login.png'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../components/card/Card'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { Loader } from '../../components/loader/Loader'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const LoginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoading(false)
                navigate('/')
                toast.success('Login Successfull!')
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
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
                            <button type='submit' className='--btn --btn-danger --btn-block'><FaGoogle color='#fff' /> Login With Google</button>
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
