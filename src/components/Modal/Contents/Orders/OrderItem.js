import { React } from 'react'
import { cartActions } from '../../../../store/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

// import Track from '../../../Track/Track'

import './OrderItem.css'

const formatStatus = (status) => {
    // change the case of status to Title Case and replace _ with space
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}



function OrderItem(props) {

    console.log(props)

    const dispatch = useDispatch()

    const [status, setStatus] = useState(props.status)

    const [items, setItems] = useState(props.items)

    const [assignedDeliveryPerson, setAssignedDeliveryPerson] = useState(props.assignedDeliveryPerson?.name)
    const [assignedDeliveryPersonPhone, setAssignedDeliveryPersonPhone] = useState(props.assignedDeliveryPerson?.phone_number?.toString().slice(3,13))

    useEffect(() => {
        if(props.status !== 'Delivered' && props.status !== 'Completed' && props.status !== 'delivered' && props.status !== 'completed') {
            const webSocketURL = 'ws://127.0.0.1:8000/ws/orders/' + props.orderId + '/'
            const ws = new WebSocket(webSocketURL)
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'order_status_update') {
                    console.log('Order status update')
                    setStatus(data.status)
                }else if(data.type === 'order_item_update'){
                    console.log('Order item update')
                    const item_id = data.item_id
                    // find the item in items array and update its status
                    const updatedItems = items.map(item => {
                        if(item.menu_item_id === item_id) {
                            item.status = data.status
                        }
                        return item
                    })
                    setItems(updatedItems)
                }
                console.log(data)
            }
            ws.onclose = (event) => {
                console.log('Websocket for order ' + props.orderId + ' closed')
            }
            return () => {
                ws.close()
            }
        }
        else {
            setStatus(props.status)
            return () => {
                return
            }
        }
    }, [props.orderId, props.status, props.items])
    // const date = new Date(props.date).getDate() + ' ' + new Date(props.date).toLocaleString('default', { month: 'short' }) + ' \'' + new Date(props.date).getFullYear().toString().slice(2)

    // set date acc to dd/mm/yy format
    const date = new Date(props.date).toLocaleDateString('en-GB')


    // remove seconds from time
    const time = props.time.slice(0,5)
    
    let orderStatus = <div className='order-item-status general'>{formatStatus(status)}</div>
    // change the color class based on status
    if (props.mode === 'delivery' || props.mode === 'Delivery') {
        if (status === 'Delivered' || status === 'Completed' || status === 'delivered' || status === 'completed') {
            orderStatus = <div className='order-item-status delivered'>{formatStatus(status)}</div>
        }
        else if (status === 'Ready' || status === 'ready') {
            orderStatus = <div className='order-item-status ready'>{formatStatus(status)}</div>
        }
        else if (status === 'Cancelled' || status === 'cancelled' || status === 'Canceled' || status === 'canceled') {
            orderStatus = <div className='order-item-status cancelled'>{formatStatus(status)}</div>
        }
        else if (status === 'Pending' || status === 'pending') {
            orderStatus = <div className='order-item-status pending'>{formatStatus(status)}</div>
        }
        else if (status === 'Out For Delivery' || status === 'out_for_delivery') {
            orderStatus = <div className='order-item-status out-for-delivery'>{formatStatus(status)}</div>
        }
    }else{
        // check for all items in order and set status accordingly
        let numItemsReady = 0
        for(let i = 0; i < items.length; i++) {
            if(items[i].status === 'Ready' || items[i].status === 'ready') {
                numItemsReady += 1
            }
        }
        if(numItemsReady === items.length) {
            orderStatus = <div className='order-item-status ready'>{formatStatus(status)}</div>
        }else if (numItemsReady === 0) {
            orderStatus = <div className='order-item-status pending'>{formatStatus(status)}</div>
        }else{
            // some items are ready
            // show status as 'Collect: x items'
            orderStatus = <div className='order-item-status ready'>{`Collect: ${numItemsReady} items`}</div>
        }
    
    }

    const addOrderToCart = () => {
        props.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                dispatch(cartActions.addItem({
                    id: item.menu_item_id,
                    idBackend: item.menu_item_id,
                    name: item.item_name,
                    price: Number(item.item_price),
                    image: item.item_image,
                    type: item.item_veg_nonveg_egg
                }))
            }
        })
        console.log('Added previous order items to cart')
        props.openCart()
    }
    
  return (
    <div className='order-item'>
        <div className='order-item-r1'>
            <div className='order-item-token-contact-dt'>
                {(props.mode === 'delivery' || props.mode === 'Delivery' )?
                    <div className='order-item-contact'>
                        <p>For delivery details </p>
                        Contact: {assignedDeliveryPersonPhone}
                    </div>
                : <div className='order-item-token'>
                    Token: {props.token}
                    </div>
                }
                <div className='order-item-date-time'>
                    {date} / {time}
                </div>    
            </div>
            <div className='reorder-icon-container'>
                <div className='reorder-icon' onClick={addOrderToCart}>
                    Reorder 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.5446 11C15.2943 11 15.9541 10.59 16.2939 9.97L19.8726 3.48C20.2425 2.82 19.7627 2 19.0029 2L4.20844 2L3.26879 0L0 0L0 2L1.99926 2L5.59792 9.59L4.24842 12.03C3.51869 13.37 4.47834 15 5.99777 15L17.9933 15L17.9933 13L5.99777 13L7.09736 11L14.5446 11ZM5.15808 4L17.3036 4L14.5446 9H7.5272L5.15808 4ZM5.99777 16C4.89818 16 4.00851 16.9 4.00851 18C4.00851 19.1 4.89818 20 5.99777 20C7.09736 20 7.99703 19.1 7.99703 18C7.99703 16.9 7.09736 16 5.99777 16ZM15.9941 16C14.8945 16 14.0048 16.9 14.0048 18C14.0048 19.1 14.8945 20 15.9941 20C17.0937 20 17.9933 19.1 17.9933 18C17.9933 16.9 17.0937 16 15.9941 16Z" fill="#F3F3E7"/>
                    </svg>
                </div>
            </div>
        </div>
        <div className='order-item-r2'>
            <div className='order-item-items'>
                {items.map((item,index) => {
                    return (
                        // <div className={`order-item-item item-${item.status}`} key={index}>
                        //         {item.quantity}x {item.item_name}
                        // </div>
                        props.mode === 'delivery' || props.mode === 'Delivery' ?
                        <div className={`order-item-item`} key={index}>
                            {item.quantity}x {item.item_name}
                        </div>
                        :
                        <div className={`order-item-item item-${item.status}`} key={index}>
                                {item.quantity}x {item.item_name}
                        </div>
                    )
                })}
            </div>
        </div>
        <div className='order-item-r3'>
            {/* <div className='order-item-save'>Save Order</div> */}
            {orderStatus}
            <div className='order-item-total'>Total: Rs. {props.total} </div>
        </div>
        {/* {bottom} */}
    </div>
  )
}

export default OrderItem
