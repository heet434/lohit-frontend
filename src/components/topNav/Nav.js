import React from 'react'

import './Nav.css'
import MenuIcon from '../../assets/icons/menu.svg'
import CartIcon from '../../assets/icons/cart.svg'
import ProfileIcon from '../../assets/icons/profile.svg'

function TopNav() {
  return (
    <div className='topNav'>
      <div className='topNav-container'>
        <div className='nav-logo'>
          <div>LOHIT</div>
          <div>CANTEEN</div>
        </div>
        <div className='nav-list'>
          <div className='nav-item'>
              <img src={MenuIcon} alt='menu' />
              Menu
          </div>
          <div className='nav-item'>
              <img src={CartIcon} alt='cart' />
              Cart
          </div>
          <div className='nav-item'>
              <img src={ProfileIcon} alt='profile' />
              Profile
          </div>
        </div>
        </div>
    </div>
  )
}

export default TopNav
