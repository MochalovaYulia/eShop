import React, { useRef } from 'react';
import styles from './Contact.module.scss'
import { Card } from '../../components/card/Card'
import {FaPhoneAlt, FaEnvelope, FaTwitter} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bu4iohs', 'template_mh3qh8r', form.current, 'wudaZlrfvThqDtoiu')
      .then((result) => {
          toast.success('Message sent successfully')
      }, (error) => {
          toast.error(error.text)
      });
    
    e.target.reset()
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input
                type='text'
                placeholder='Full Name'
                name='user_name'
                required
              />
              <label>Email:</label>
              <input
                type='text'
                placeholder='Your active email'
                name='user_email'
                required
              />
              <label>Subject:</label>
              <input
                type='text'
                placeholder='Subject'
                name='subject'
                required
              />
              <label>Message:</label>
              <textarea cols={10} rows={10} />
              <button className='--btn --btn-primary'>Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our contact information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 705 141 6545</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Abuja, Nigeria</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@ZinoTrust</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
