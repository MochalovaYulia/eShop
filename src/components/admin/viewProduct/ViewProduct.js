import React, { useEffect, useState } from 'react'
import styles from './ViewProduct.module.scss'
import { toast } from 'react-toastify'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import { Loader } from '../../loader/Loader'
import { Link } from 'react-router-dom'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import { deleteObject, ref } from 'firebase/storage'

export const ViewProduct = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {

      const productsRef = collection(db, "product");
      const q = query(productsRef, orderBy("createAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts(allProducts);
      })

      setIsLoading(false)
    
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const deleteProduct = async(id, imageURL) => {
    setIsLoading(true)
    try {
      await deleteDoc(doc(db, "product", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success('Product Deleted Successfully.')
      setIsLoading(false)
    } catch (error) {
      toast.error(error.massage)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Product Found.</p>
        ) : (
          <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
            {products.map((product, index) => {
              const {id, name, imageURL, price, category} = product;
              return (
                <tbody key={id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imageURL} alt={name} style={{ width: '100px' }} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td>
                      <Link to='/admit/add-product'>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color='red' onClick={() => deleteProduct(id, imageURL)}/>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        )}
      </div>
    </>
  )
}
