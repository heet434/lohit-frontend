import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MenuItem.css'

import { cartActions } from '../../store/slices/cartSlice'

import { modalDisplayActions } from '../../store/slices/modalDisplaySlice'

import { removeWhiteSpace } from '../../utils/strUtils'


function MenuItem(props) {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.authLohitClient.isLoggedIn)

  // get quantity of item in cart
  const itemInCart = useSelector(state => state.cart.items.find(item => item.id === props.id))
  const quantity = itemInCart ? itemInCart.quantity : 0

  const openLogin = () => {
    dispatch(modalDisplayActions.openLogin())
  }

  const addItemToCart = () => {

    if(!isLoggedIn){
      openLogin()
      return
    }
    dispatch(cartActions.addItem({
      id: props.id,
      idBackend: props.idBackend,
      name: props.itemName,
      price: Number(props.price),
      image: props.img,
      type: props.itemType
  }))}

  const removeItem = () => {
    dispatch(cartActions.removeExistingItem({id: props.id}))  
  }
  const addItem = () => {
    dispatch(cartActions.addItem({id: props.id}))
  }

  const addItemButtonBeforeAdding = 
  <div className='add-icon' onClick={addItemToCart}>
    Add 
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
      <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535ZM6.1897 5.3L20.7643 5.3L17.4535 11.3H9.03265L6.1897 5.3ZM7.19733 19.7C5.87782 19.7 4.81021 20.78 4.81021 22.1C4.81021 23.42 5.87782 24.5 7.19733 24.5C8.51684 24.5 9.59644 23.42 9.59644 22.1C9.59644 20.78 8.51684 19.7 7.19733 19.7ZM19.1929 19.7C17.8734 19.7 16.8058 20.78 16.8058 22.1C16.8058 23.42 17.8734 24.5 19.1929 24.5C20.5124 24.5 21.592 23.42 21.592 22.1C21.592 20.78 20.5124 19.7 19.1929 19.7Z" fill="#F3F3E7"/>
    </svg>
  </div>

  const addItemButtonAfterAdding = (
    // <div className='cart-item-quantity'>
    <div className='add-icon-plus-minus'>
      <div className='add-icon-plus' onClick={removeItem}>-</div>
      {quantity}
      <div className='add-icon-minus' onClick={addItem}>+</div>
    </div>
  );
  

  const addItemButton = quantity === 0 ? addItemButtonBeforeAdding : addItemButtonAfterAdding
  const addItemButtonWhenNotAvailable = <div className='add-icon-na'>NA</div>


  const vegIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#00BA34" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="8.99951" cy="9" r="4" fill="#00BA34"/>
  </svg>

  const eggIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#EFC900" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="8.99951" cy="9" r="4" fill="#EFC900"/>
  </svg>

  const nonVegIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
    <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#FF0000" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="8.99951" cy="9.5" r="4" fill="#FF0000"/>
  </svg>

  let icon = vegIcon;
  if(props.itemType ==='veg')
    icon = vegIcon;
  else if(props.itemType === 'egg')
    icon = eggIcon;
  else if(props.itemType === 'non_veg')
    icon = nonVegIcon;

  const menuItemClassName = (props.is_available && props.is_available_now) ? 'menuItem' : 'menuItem not-available'

  const menuItemDescription = props.is_available ? props.is_available_now ? props.description :'Item not available right now, should be available by '+props.nextTime + '.' : 'Not available.'

  return (
    <div className={menuItemClassName} id={removeWhiteSpace(props.itemName)}>
      <div className='menuItem-description-container'>
        <div className='veg-nonveg-icon'>
          {icon}
        </div>
        <div className='menuItem-description'>
          <div className='menuItem-description-line1'> 
            <h3 className='menuItem-name'>
              {props.itemName}
            </h3>
            {/* <p className='menuItem-waitingTime'>
              {props.waitingTime} min
            </p> */}
          </div>
          <div className='menuItem-description-line2'> 
            <div className='menuItem-price'>
              Rs. {props.price}
            </div>
          </div>
          <div className='menuItem-description-line3'> 
            <div className='menuItem-description-sentence'>
              {menuItemDescription}
            </div>
          </div>
        </div>
      </div>
      <div className='menuItem-img-container'>
        <img src={props.img} alt='food item' className='menuItem-img'/>
        {/* <img src={addIcon} alt='add icon' className='add-icon' onClick={addItemToCart}/> */}
        {(props.is_available && props.is_available_now) ? addItemButton : addItemButtonWhenNotAvailable}
      </div>
    </div>
  )
};

export default MenuItem;
