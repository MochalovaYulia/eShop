import React from 'react'
import styles from './Home.module.scss'
import { Slider } from '../../components/slider/Slider'
import { Product } from '../../components/product/Product'

export const Home = () => {
  return (
    <div>
      {/* <Slider/> */}
      <Product />
    </div>
  )
}
