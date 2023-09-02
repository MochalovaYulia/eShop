import React from 'react'
import styles from './Product.module.scss'
import { ProductFilter } from './productFilter/productFilter'
import { ProductList } from './productList/productList'

export const Product = () => {
    return (
        <section>
            <div className={`container ${styles.product}`}>
                <aside className={styles.filter}>
                    <ProductFilter />
                </aside>

                <div className={styles.content}>
                    <ProductList />
                </div>
            </div>
        </section>
    )
}
