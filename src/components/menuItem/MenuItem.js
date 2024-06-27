import React from 'react'
import { useDispatch , useSelector} from 'react-redux'

import './MenuItem.css'
import addIcon from '../../assets/icons/add.png'

import { cartActions } from '../../store/slices/cartSlice'

import { modalDisplayActions } from '../../store/slices/modalDisplaySlice'

import { removeWhiteSpace } from '../../utils/strUtils'


function MenuItem(props) {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

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

  return (
    <div className='menuItem' id={removeWhiteSpace(props.itemName)}>
      <div className='menuItem-description-container'>
        <div className='veg-nonveg-icon'>
          {icon}
        </div>
        <div className='menuItem-description'>
          <div className='menuItem-description-line1'> 
            <h3 className='menuItem-name'>
              {props.itemName}
            </h3>
            <p className='menuItem-waitingTime'>
              {props.waitingTime} min
            </p>
          </div>
          <div className='menuItem-description-line2'> 
            <div className='menuItem-price'>
              Rs. {props.price}
            </div>
          </div>
          <div className='menuItem-description-line3'> 
            <div className='menuItem-description-sentence'>
              {props.description}
            </div>
          </div>
        </div>
      </div>
      <div className='menuItem-img-container'>
        <img src={props.img} alt='food item' className='menuItem-img'/>
        <img src={addIcon} alt='add icon' className='add-icon' onClick={addItemToCart}/>
      </div>
    </div>
  )
};

export default MenuItem;
