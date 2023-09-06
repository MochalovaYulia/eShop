import React, { useEffect } from 'react'
import styles from './Home.module.scss'
import { Slider } from '../../components/slider/Slider'
import { Product } from '../../components/product/Product'

export const Home = () => {
  const url = window.location.href

  const scrollToProduct = () => {
    if(url.includes('#products')) {
      window.scroll({
        top: 700,
        behavior: 'smooth'
      })
      return
    }
  }

  useEffect(() => {
    scrollToProduct()
  }, [])

  return (
    <div>
      <Slider/>
      <Product />
    </div>
  )
}
