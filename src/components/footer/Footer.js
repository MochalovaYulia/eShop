import React from 'react'
import style from './Footer.module.scss'

const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
  return (
    <div className={style.footer}>
      &copy; {year} All Rights Reserved
    </div>
  )
}
