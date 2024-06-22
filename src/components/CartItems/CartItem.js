import React from 'react'

import './CartItem.css'


function CartItem(props) {
  return (
    <div className='cart-item-container'>
            <div className='cart-item-image'>
                <img src={props.image} alt={props.name} />
            </div>
            <div className='cart-item-name'>{props.name}</div>
            <div className='cart-item-quantity'>
                <div className='cart-item-quantity-minus' onClick={props.decrementQuantity}>-</div>
                {props.quantity}
                <div className='cart-item-quantity-plus' onClick={props.incrementQuantity}>+</div>
            </div>
            <div className='cart-item-total'>Total: Rs. {props.total}</div>
    </div>
  )
}

export default CartItem
