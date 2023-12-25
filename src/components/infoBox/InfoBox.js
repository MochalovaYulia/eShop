import React from 'react'
import styles from './InfoBox.module.scss'
import { Card } from '../card/Card'

export const InfoBox = ({cardClass, title, icon, count}) => {
  return (
    <div className={styles['info-box']}>
        <Card cardClass={cardClass}>
            <h4>{title}</h4>
            <span>
                <h3>{count}</h3>
                {icon}
            </span>
        </Card>
    </div>
  )
}