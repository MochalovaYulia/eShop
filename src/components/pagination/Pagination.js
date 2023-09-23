import React, { useState } from 'react'
import styles from './Paginatiom.module.scss'

export const Pagination = ({ currentPage, setCurrentPage, productPerPage, totalProducts }) => {
  const totalPages = totalProducts / productPerPage
  const pageNumbers = []
  const [numberPageLimit, setNumberPageLimit] = useState(5)
  const [maxNumberPageLimit, setMaxNumberPageLimit] = useState(5)
  const [minNumberPageLimit, setMinNumberPageLimit] = useState(0)

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i)
  }
  
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }

  const paginateNext = () => {
    setCurrentPage(currentPage + 1)
    //Следующий набор номеров страниц
    if(currentPage + 1 > maxNumberPageLimit) {
      setMaxNumberPageLimit(maxNumberPageLimit + numberPageLimit)
      setMinNumberPageLimit(minNumberPageLimit + numberPageLimit)
    }
  }

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1)
    //Предыдущий набор номеров страниц
    if((currentPage - 1) % numberPageLimit === 0) {
      setMaxNumberPageLimit(maxNumberPageLimit - numberPageLimit)
      setMinNumberPageLimit(minNumberPageLimit - numberPageLimit)
    }
  }
  
  return (
    <ul className={styles.pagination}>
      <li 
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null} 
        onClick={() => paginatePrev()}
      >
        Prev
      </li>
      {
        pageNumbers.map((number) => {
         if(number < maxNumberPageLimit + 1 && number > minNumberPageLimit) {
          return (
            <li 
              key={number} 
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          )
         }
        })
      }
      <li 
        className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}
        onClick={() => paginateNext()}
      >
        Next
      </li>

      <p>
        <b className={styles.page}>{`Page ${currentPage}`}</b>
        <span> of </span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  )
}
