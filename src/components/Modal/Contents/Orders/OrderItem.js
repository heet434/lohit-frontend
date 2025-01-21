import { useState, React } from 'react'

// import Track from '../../../Track/Track'

import './OrderItem.css'



function OrderItem(props) {

    const date = new Date(props.date).getDate() + ' ' + new Date(props.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(props.date).getFullYear()
    // remove seconds from time
    const time = props.time.slice(0,5)
    // const [bottom, setBottom] = useState(<div></div>)

    // const trackOrder = () => {
    //     setBottom(<div><Track orderId={props.orderId}/> </div>)
    // }
    let className = 'order-item'
    if(props.status === 'pending' || props.status === 'accepted' || props.status === 'Pending' || props.status === 'Accepted'){
        className = 'order-item order-item-highlight'
    }
    
  return (
    <div className={className}>
        <div className='order-item-r1'>
            <div className='order-item-date'>
                Date: {date}
            </div>
            <div className='order-item-time'>
                Time: {time}
            </div>
            {/* <div className='order-item-track' onClick={trackOrder}>
                Track Order
            </div> */}
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
        {/* {bottom} */}
    </div>
  )
}

export default OrderItem
