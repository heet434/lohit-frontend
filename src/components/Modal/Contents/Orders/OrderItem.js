import React from 'react'

function OrderItem(props) {
  return (
    <div className='order-item'>
        <div className='order-item-date'>
            {props.date}
        </div>
        <div className='order-item-items'>
            {props.items.map(item => {
                return (
                    <div className='order-item-item'>
                            {item.quantity}x {item.name}
                    </div>
                )
            })}
        </div>
        <div className='order-last-row'>
            <div className='order-item-total'>Total: </div>
            <div className='order-item-save'>Save Order</div>
        </div>
    </div>
  )
}

export default OrderItem
