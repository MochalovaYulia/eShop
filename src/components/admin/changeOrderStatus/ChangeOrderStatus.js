import React, { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import { Card } from '../../card/Card'
import { Loader } from '../../loader/Loader'

export const ChangeOrderStatus = () => {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const editStatus = () => {

  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={editStatus}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='' disabled>-- Choose one --</option>
                <option value='Order Placed...'>Order Placed...</option>
                <option value='Processing...'>Processing...</option>
                <option value='Shipped...'>Shipped...</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </span>
            <span>
              <button type='submit' className='--btn --btn-primary'>Update Status</button>
            </span>
          </form>
        </Card>
      </div>
    </>
  )
}
