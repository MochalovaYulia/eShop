import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import { useFetchCollection } from '../../customHooks/useFetchCollection'

export const OrderHistory = () => {
  const {data, isLoading} = useFetchCollection('orders')
  
  
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>orderHistory</div>
  )
}
