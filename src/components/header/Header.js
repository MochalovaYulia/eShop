import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { set_active_user } from '../../redux/slice/authSlice'

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
  ({ isActive }) => (isActive ? `${style.active}` : '')
)

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(set_active_user({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userId: user.uid,
        }))
      } else {
        setDisplayName("");
      }
    });
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const LogoutUser = () => {
    signOut(auth).then(() => {
      toast.success('Logout Successfully!')
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  return (
    <>
      <ToastContainer />

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
                <FaTimes size={22} color='#fff' onClick={hideMenu} />
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
                <a href='#'>
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
                <NavLink to='/login' className={activeLink}>Login</NavLink>
                <NavLink to='/register' className={activeLink}>Register</NavLink>
                <NavLink to='/order-history' className={activeLink}>My Orders</NavLink>
                <NavLink to='/' onClick={LogoutUser}>Logout</NavLink>
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
    </>
  )
}
