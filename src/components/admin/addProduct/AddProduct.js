import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import { Card } from '../../card/Card'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase/config';
import { toast } from 'react-toastify';

export const AddProduct = () => {

  const [UploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Phone' },
  ]

  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    price: 0,
    category: '',
    brand: '',
    desc: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
        setUploadProgress(progress)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product, imageURL: downloadURL})
          toast.success('Image uploaded successfully!')
        });
      }
    );

  }

  const addProduct = (e) => {
    e.preventDefault()
    console.log(product)
  }

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
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
            {UploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div className={styles['progress-bar']} style={{ width:  `${UploadProgress} %` }}>
                  {UploadProgress < 100 ? `Uploading ${UploadProgress}` : `Upload Copmlete ${UploadProgress}%`}
                </div>
              </div>
            )}
            
            <input
              type='file'
              accept='image/*'
              name='image'
              placeholder='Product image'
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL === '' ? null : (
              <input
              type='text'
              name='imageURL'
              placeholder='Image URL'
              value={product.imageURL}
              required
              disabled
            />
            )}
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
            type='text'
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
