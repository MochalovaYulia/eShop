import React, { useEffect } from 'react'
import styles from './ViewProduct.module.scss'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import { Loader } from '../../loader/Loader'
import { Link } from 'react-router-dom'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { selectProduct, store_products } from '../../../redux/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCollection } from '../../../customHooks/useFetchCollection'

export const ViewProduct = () => {
  const { data, isLoading } = useFetchCollection('product')
  const products = useSelector(selectProduct)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      store_products({
        products: data,
      })
    );
  }, [dispatch, data])

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      },
    );
  }

  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db, "product", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success('Product Deleted Successfully.')
    } catch (error) {
      toast.error(error.massage)
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
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color='red' onClick={() => confirmDelete(id, imageURL)}/>
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
