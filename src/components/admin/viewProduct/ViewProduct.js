import React, { useEffect, useState } from 'react'
import styles from './ViewProduct.module.scss'
import { toast } from 'react-toastify'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase/config'

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

  return (
    <div>ViewProduct</div>
  )
}
