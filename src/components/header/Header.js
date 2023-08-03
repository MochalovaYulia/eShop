import React, { useState } from 'react'
import style from './Header.module.scss'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaTimes } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

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

export const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  return (
    <header>
      <div className={style.header}>
        {logo}

        <nav className={showMenu ? `${style['show-nav']}` : `${style['hide-nav']}`}>
          <div onClick={hideMenu}
          className={showMenu ? `${style['nav-wrapper']} ${style['show-nav-wrapper']}` : `${style['nav-wrapper']}
          `}
          ></div>
          <ul onClick={hideMenu}>
            <li className={style['logo-mobile']}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu}/>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
          </ul>
          <div className={style['header-right']} onClick={hideMenu}>
            <span className={style.links}>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
              <Link to='/order-history'>My Orders</Link>
            </span>
            <span className={style.cart}>
              {cart}
            </span>
          </div>
        </nav>

        <div className={style['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  )
}
