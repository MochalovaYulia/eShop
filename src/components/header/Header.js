import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { remove_active_user, set_active_user } from '../../redux/slice/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../hiddenLink/HiddenLink'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import { calculate_cart_total_quantity, selectCartTotalQuantity } from '../../redux/slice/cartSlice'

const logo = (
  <div className={style.logo}>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
)

const activeLink = (
  ({ isActive }) => (isActive ? `${style.active}` : '')
)

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch()
  const CartTotalQuantity = useSelector(selectCartTotalQuantity)

  useEffect(() => {
    dispatch(calculate_cart_total_quantity())
  }, [])

  const fixNavbar = () => {
    if(window.scrollY > 1) {
      setScrollPage(true)
    } else {
      setScrollPage(false)
    }
  }
  window.addEventListener('scroll', fixNavbar)
  
  const cart = (
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={20} />
      <p>{CartTotalQuantity}</p>
    </Link>
  )

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
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
        dispatch(remove_active_user())
      }
    });
  }, [dispatch, displayName])

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

      <header className={scrollPage ? `${style.fixed}` : null}>
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
                <AdminOnlyLink>
                  <NavLink to='/admin/home'>
                    <button className='--btn --btn-primary'>Admin</button>
                  </NavLink>
                </AdminOnlyLink>
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
                <ShowOnLogin>
                  <a href='#home' style={{color: '#ff7722'}}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>
                </ShowOnLogin>
                <ShowOnLogout><NavLink to='/login' className={activeLink}>Login</NavLink></ShowOnLogout>
                {/* <ShowOnLogout><NavLink to='/register' className={activeLink}>Register</NavLink></ShowOnLogout> */}
                <ShowOnLogin><NavLink to='/order-history' className={activeLink}>My Orders</NavLink></ShowOnLogin>
                <ShowOnLogin><NavLink to='/' onClick={LogoutUser}>Logout</NavLink></ShowOnLogin>
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
