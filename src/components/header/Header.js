import React, { useState } from 'react'
import style from './Header.module.scss'
import { Link, NavLink } from 'react-router-dom'
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

const activeLink = (
  ({isActive}) => (isActive ? `${style.active}` : '')
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
              <NavLink to='/' className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>
          <div className={style['header-right']} onClick={hideMenu}>
            <span className={style.links}>
              <NavLink to='/login' className={activeLink}>Login</NavLink>
              <NavLink to='/register'className={activeLink}>Register</NavLink>
              <NavLink to='/order-history' className={activeLink}>My Orders</NavLink>
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
