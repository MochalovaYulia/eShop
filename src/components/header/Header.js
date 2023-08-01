import React from 'react'
import style from './Header.module.scss'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

export const Header = () => {

  const logo = (
    <div className={style.logo}>
      <Link to='/'>
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  )

  const cart = (
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  )

  return (
    <header>
      <div className={style.header}>
        {logo}

        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
          </ul>
        </nav>

        <div className={style['header-right']}>
          <span className={style.links}>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/order-history'>My Orders</Link>
          </span>
          <span className={style.cart}>
            {cart}
          </span>
        </div>
      </div>
    </header>
  )
}
