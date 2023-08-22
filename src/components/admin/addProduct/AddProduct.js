import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import { Card } from '../../card/Card'

export const AddProduct = () => {

  const categories = [
    {id: 1, name: 'Laptop'},
    {id: 2, name: 'Electronics'},
    {id: 3, name: 'Fashion'},
    {id: 4, name: 'Phone'},
  ]

  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    price: null,
    category: '',
    brand: '',
    desc: '',
  })

  const handleInputChange = (e) => { }
  const handleImageChange = (e) => { }

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form>
          <label>Product Name:</label>
          <input
            type='text'
            onChange={(e) => handleInputChange(e)}
            placeholder='Product name'
            name='name'
            value={product.name}
            required
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles['progress-bar']} style={{width: '50%'}}>
                Uploading 50%
              </div>
            </div>
            <input 
              type='file' 
              accept='image/*'
              name='image' 
              placeholder='Product image'
              onChange={(e) => handleImageChange(e)}
            />
            <input 
              type='text' 
              name='imageURL'
              value={product.imageURL}
              required
              disabled
            />
          </Card>

          <label>Product Price:</label>
          <input 
            type='number'
            placeholder='Product price'
            required
            name='price'
            value={product.price}
            onChange={(e) => handleInputChange(e)}
            />
          
          <label>Product Category:</label>
          <select 
            name='category'
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value='' disabled>-- Choose Product Category --</option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              )
            })}
          </select>

          <label>Product Company/Brand:</label>
          <input 
            type='text' 
            name='brand' 
            placeholder='Product Brand'
            value={product.brand}
            onChange={(e) => handleInputChange(e)} 
            required 
          />

          <label>Product Description:</label>
          <textarea 
            type= 'text' 
            name='desc' 
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
            required
            cols='30'
            rows='10'
          />

          <button className='--btn --btn-primary'>Save Product</button>
        </form>
      </Card>
    </div>
  )
}
