import React from 'react'
import styles from './Navbar.module.scss'
import {FaUserCircle} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectedUserName } from '../../../redux/slice/authSlice'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const activeLink = ({isActive}) => (isActive ? `${styles.active}` : '')

  const userName = useSelector(selectedUserName)

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color='#fff'/>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
              Home 
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/all-product' className={activeLink}>
              View Product
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product' className={activeLink}>
              Add Product 
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/oders' className={activeLink}>
              Oders 
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
