import React from 'react'
import OrderItem from './OrderItem'

import './Orders.css'

function Orders(props) {

    const orders = [
        {
            date: '12th August 2021',
            items: [
                {
                    name: 'Chicken Biryani',
                    quantity: 2
                },
                {
                    name: 'Pizza',
                    quantity: 1
                }
            ],
            total: 500
        },
        {
            date: '11th August 2021',
            items: [
                {
                    name: 'Coca Cola',
                    quantity: 2
                },
                {
                    name: 'Pizza',
                    quantity: 1
                }
            ],
            total: 200
        },
    ]

                

  return (
    <div className='user-orders pc-modal-in' id='orders'>
        <div className = 'order-container'>

        </div>
    </div>
  )
}

export default Orders
