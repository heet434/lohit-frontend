import { React } from 'react'
import { cartActions } from '../../../../store/slices/cartSlice'
import { useDispatch } from 'react-redux'

// import Track from '../../../Track/Track'

import './OrderItem.css'



function OrderItem(props) {

    const dispatch = useDispatch()
    // show date as 11 Jan '25
    const date = new Date(props.date).getDate() + ' ' + new Date(props.date).toLocaleString('default', { month: 'short' }) + ' \'' + new Date(props.date).getFullYear().toString().slice(2)


    // remove seconds from time
    const time = props.time.slice(0,5)
    
    let orderStatus = <div className='order-item-status'>{props.status}</div>
    // change the color class based on status
    if (props.status === 'Delivered' || props.status === 'Completed' || props.status === 'delivered' || props.status === 'completed') {
        orderStatus = <div className='order-item-status delivered'>{props.status}</div>
    }
    else if (props.status === 'Ready' || props.status === 'ready') {
        orderStatus = <div className='order-item-status ready'>{props.status}</div>
    }
    else if (props.status === 'Cancelled' || props.status === 'cancelled' || props.status === 'Canceled' || props.status === 'canceled') {
        orderStatus = <div className='order-item-status cancelled'>{props.status}</div>
    }
    else if (props.status === 'Pending' || props.status === 'pending') {
        orderStatus = <div className='order-item-status pending'>{props.status}</div>
    }

    const addOrderToCart = () => {
        props.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                dispatch(cartActions.addItem({
                    id: item.id,
                    idBackend: item.id,
                    name: item.item_name,
                    price: Number(item.item_price),
                    image: item.item_image,
                    type: item.veg_nonveg_egg
                }))
            }
        })
        console.log('Added previous order items to cart')
        props.openCart()
    }
    
  return (
    <div className='order-item'>
        <div className='order-item-r1'>
            <div className='order-item-date'>
                {date}
            </div>
            <div className='order-item-time'>
                {time} hrs
            </div>
            <div className='reorder-icon-container'>
                <div className='reorder-icon' onClick={addOrderToCart}>
                    Reorder 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
                        <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535ZM6.1897 5.3L20.7643 5.3L17.4535 11.3H9.03265L6.1897 5.3ZM7.19733 19.7C5.87782 19.7 4.81021 20.78 4.81021 22.1C4.81021 23.42 5.87782 24.5 7.19733 24.5C8.51684 24.5 9.59644 23.42 9.59644 22.1C9.59644 20.78 8.51684 19.7 7.19733 19.7ZM19.1929 19.7C17.8734 19.7 16.8058 20.78 16.8058 22.1C16.8058 23.42 17.8734 24.5 19.1929 24.5C20.5124 24.5 21.592 23.42 21.592 22.1C21.592 20.78 20.5124 19.7 19.1929 19.7Z" fill="#F3F3E7"/>
                    </svg>
                </div>
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
            {orderStatus}
        </div>
        {/* {bottom} */}
    </div>
  )
}

export default OrderItem
