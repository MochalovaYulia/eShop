import React from 'react'
import styles from './Admin.module.scss'
import { Navbar } from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../components/admin/home/Home'
import { Oders } from '../../components/admin/oders/Oders'
import { ViewProduct } from '../../components/admin/viewProduct/ViewProduct'
import { AddProduct } from '../../components/admin/addProduct/AddProduct'
import { OrderDetails } from '../../components/admin/orderDetails/OrderDetails'

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='all-product' element={<ViewProduct />} />
          <Route path='add-product/:id' element={<AddProduct />} />
          <Route path='orders' element={<Oders />} />
          <Route path='order-details/:id' element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  )
}
