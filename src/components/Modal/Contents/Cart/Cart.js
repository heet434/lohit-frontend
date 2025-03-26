import {React} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify'
import CartItem from '../../../CartItems/CartItem'

import { cartActions } from '../../../../store/slices/cartSlice'

import './Cart.css'



function Cart(props) {

    const dispatch = useDispatch()

    const removeItem = (id) => {
        dispatch(cartActions.removeExistingItem({id: id}))
    }
    const addItem = (id) => {
        dispatch(cartActions.addItem({id: id}))
    }

    const totalCartPrice = useSelector(state => state.cart.totalPrice)

    const totalCartItems = useSelector(state => state.cart.totalQuantity)

    const cartItemsList = useSelector(state => state.cart.items)

    const cartItems = cartItemsList.map((item, index) => {
        return (
            <CartItem 
                key={index}
                name={item.name}
                image={item.image}
                quantity={Number(item.quantity)}
                total={Number(item.totalPrice)}
                removeItem={() => removeItem(item.id)}
                addItem={() => addItem(item.id)}
            />
        )})
    
    const openCheckoutPage = () => {

        const cartErrorToastOptions = {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        }

        // check if cart is empty
        if(cartItemsList.length === 0){
            toast.error('Cart is empty', cartErrorToastOptions)
            return
        }
        props.openCheckout()
    }

  return (
    <div className='cart pc-modal-in' id='cart'>
        <div className = 'cart-container'>
            {/* r1 */}
            <div className='cart-close cart-r1' onClick={props.closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="32" viewBox="0 0 15 32" fill="none">
                    <path d="M14.0859 2.77799L11.9677 0.000671387L0.000222206 15.6917L11.9677 31.3828L14.0859 28.6055L4.23671 15.6917L14.0859 2.77799Z" fill="#2B252E"/>
                </svg>
            </div>
            <div className='cart-title cart-r1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                    <path d="M23.2714 18.1C24.4709 18.1 25.5265 17.444 26.0703 16.452L31.7962 6.068C32.388 5.012 31.6203 3.7 30.4047 3.7L6.7335 3.7L5.23006 0.5L0 0.5L0 3.7L3.19881 3.7L8.95667 15.844L6.79748 19.748C5.62991 21.892 7.16534 24.5 9.59644 24.5L28.7893 24.5V21.3L9.59644 21.3L11.3558 18.1L23.2714 18.1ZM8.25293 6.9L27.6857 6.9L23.2714 14.9L12.0435 14.9L8.25293 6.9ZM9.59644 26.1C7.83709 26.1 6.41362 27.54 6.41362 29.3C6.41362 31.06 7.83709 32.5 9.59644 32.5C11.3558 32.5 12.7952 31.06 12.7952 29.3C12.7952 27.54 11.3558 26.1 9.59644 26.1ZM25.5905 26.1C23.8312 26.1 22.4077 27.54 22.4077 29.3C22.4077 31.06 23.8312 32.5 25.5905 32.5C27.3498 32.5 28.7893 31.06 28.7893 29.3C28.7893 27.54 27.3498 26.1 25.5905 26.1Z" fill="#2B252E"/>
                </svg>
                CART
            </div>
            {/* r2 */}
            <div className='cart-r2-r3 cart-items'>
                {cartItems}
            </div>
            <div className='cart-r4 cart-summary summary-container'>
                <h1>SUMMARY</h1>
                    <div className='summary-row-title'>Quantity</div>
                    <div className='summary-line'></div> {/* line */}
                    <div className='summary-row-value'>{totalCartItems} items</div>
                    <div className='summary-row-title'>Cart total</div>
                    <div className='summary-line'></div> {/* line */}
                    <div className='summary-row-value'>{`Rs. ${totalCartPrice}`}</div>
                    {/* <div className='summary-row-title summary-total'>Total</div>
                    <div className='summary-line summary-total'></div>
                    <div className='summary-row-value summary-total'>{`Rs. ${totalCartPrice + deliveryCharge}`}</div> */}
            </div>
            {/* r3 */}
            <div className='modal-button cart-r5' onClick={openCheckoutPage}>
                Continue
            </div>
        </div>
    </div>
  )
}

export default Cart
