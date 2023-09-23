import React, { useEffect, useState } from 'react'
import styles from './productList.module.scss'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa'
import { Search } from '../../search/Search'
import { ProductItem } from '../productItem/productItem'
import { useDispatch, useSelector } from 'react-redux'
import { filter_by_search, selectFilteredProducts, sort_products } from '../../../redux/slice/filterSlice'
import { Pagination } from '../../pagination/Pagination'

export const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const filteredProducts = useSelector(selectFilteredProducts)

  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage, setProductPerPage] = useState(2)
  //получить текущий продукт
  const indexOfLastProduct = currentPage * productPerPage
  const indexOfFirstProduct = indexOfLastProduct - productPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter_by_search({products, search}))
  }, [dispatch, products, search])

  useEffect(() => {
    dispatch(sort_products({products, sort}))
  }, [dispatch, products, sort])

  return (
    <div className={styles['product-list']} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='orangered' onClick={() => setGrid(true)} />
          <FaListAlt size={24} color='#0066d4' onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>

        <Search value={search} onChange={(e) => setSearch(e.target.value)}/>

        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='higest-price'>Higest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
          </select>
        </div>
        
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {products.lenght === 0 ? (
            <p>No Product found</p>
          ) : (
            <>
              {currentProducts.map((product) => {
                return (
                  <div key={product.id}>
                    <ProductItem {...product} grid={grid} product={product} />
                  </div>
                )
              })}
            </>
          )}
        </div>
        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productPerPage={productPerPage}
          totalProducts={filteredProducts.length}
        />
    </div>
  )
}
