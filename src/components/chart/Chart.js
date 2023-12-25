import React from 'react'
import styles from './Chart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from '../card/Card';
import { useSelector } from 'react-redux';
import { selectorOrderHistory } from '../../redux/slice/orderSlice';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};


export const Chart = () => {
  const orders = useSelector(selectorOrderHistory)

  const array = []

  orders.map((item) => {
    const { orderStatus } = item
    return array.push(orderStatus)
  })
  
  const getOrdersCount = (array, value) => {
    return array.filter((n) => n === value).length
  }
  const [q1, q2, q3, q4] = ['Order Placed..', 'Processing...', 'Shipped...', 'Delivered']

  const placed = getOrdersCount(array, q1);
  const processing = getOrdersCount(array, q2);
  const shipped = getOrdersCount(array, q3);
  const delivered = getOrdersCount(array, q4);

  const data = {
    labels: ['Order Placed', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Order count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  )
}
