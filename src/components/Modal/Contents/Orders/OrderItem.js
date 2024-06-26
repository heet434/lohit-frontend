import React from 'react'

import './OrderItem.css'

function OrderItem(props) {
  return (
    <div className='order-item'>
        <div className='order-item-r1'>
            <div className='order-item-date'>
                {props.date}
            </div>
        </div>
        <div className='order-item-r2'>
            <div className='order-item-items'>
                {props.items.map((item,index) => {
                    return (
                        <div className='order-item-item' key={index}>
                                {item.quantity}x {item.item_name}
                        </div>
                    )
                })}
            </div>
        </div>
        <div className='order-item-r3'>
            <div className='order-item-total'>Total: {props.total} Rs.</div>
            {/* <div className='order-item-save'>Save Order</div> */}
            <div className='order-item-status'>Status: {props.status}</div>
        </div>
    </div>
  )
}

export default OrderItem
