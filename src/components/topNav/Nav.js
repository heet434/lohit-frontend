import React from 'react'
import {Link} from 'react-scroll'
import {useState, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { modalDisplayActions } from '../../store/slices/modalDisplaySlice'
// import { authActions } from '../../store/slices/authSlice'

import './Nav.css'
import MenuIcon from '../../assets/icons/menu.svg'
import CartIcon from '../../assets/icons/cart.svg'
import ProfileIcon from '../../assets/icons/profile.svg'


function TopNav() {
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth)
  const [breakPoint, setBreakPoint] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if(viewPortWidth > 834){
      setBreakPoint(3)
    }else if(viewPortWidth > 480){
      setBreakPoint(2)
    }else{
      setBreakPoint(1)
    }
  },[viewPortWidth])

  const dispatch = useDispatch()

  const openProfile = () => {
    dispatch(modalDisplayActions.openProfile())
  }
  const openCart = () => {
    dispatch(modalDisplayActions.openCart())
  }

  const numItemsInCart = useSelector(state => state.cart.items.length)

  return (
    breakPoint==3 ?
        <div className='topNav'>
          <div className='topNav-container'>
            <Link to='Home' smooth={true} duration={1000}>
              <div className='nav-logo'>
                <div>LOHIT</div>
                <div>CANTEEN</div>
              </div>
            </Link>
            <div className='nav-list'>
              <Link to='Menu' smooth={true} duration={1000}>
                <div className='nav-item'>
                    <img src={MenuIcon} alt='menu' />
                    Menu
                </div>
              </Link>
              <div className='nav-item' onClick={openCart}>
                  <div style={{ position: 'relative' }}>
                    <img src={CartIcon} alt='cart' />
                    {numItemsInCart > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#17A9DD',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {numItemsInCart}
                      </div>
                    )}
                  </div>
                  Cart
              </div>
              <div className='nav-item' onClick={openProfile}>
                  <img src={ProfileIcon} alt='profile' />
                  Profile
              </div>
            </div>
            </div>
          </div>
    : breakPoint==2 ?
        <div className='topNav'>
          <div className='topNav-container'>
            <div className='nav-item-profile' onClick={openProfile}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM6.084 19.536C6.6 18.456 9.744 17.4 12 17.4C14.256 17.4 17.412 18.456 17.916 19.536C16.284 20.832 14.232 21.6 12 21.6C9.768 21.6 7.716 20.832 6.084 19.536ZM19.632 17.796C17.916 15.708 13.752 15 12 15C10.248 15 6.084 15.708 4.368 17.796C3.144 16.188 2.4 14.184 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 14.184 20.856 16.188 19.632 17.796ZM12 4.8C9.672 4.8 7.8 6.672 7.8 9C7.8 11.328 9.672 13.2 12 13.2C14.328 13.2 16.2 11.328 16.2 9C16.2 6.672 14.328 4.8 12 4.8ZM12 10.8C11.004 10.8 10.2 9.996 10.2 9C10.2 8.004 11.004 7.2 12 7.2C12.996 7.2 13.8 8.004 13.8 9C13.8 9.996 12.996 10.8 12 10.8Z" fill="#2B252E"/>
              </svg>
            </div>
            <div className='nav-logo'>
              <Link to='Home' smooth={true} duration={1000}>
                <div>LOHIT CANTEEN</div>
              </Link>
            </div>
            <div className='nav-item-cart' onClick={openCart} style={{ position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535ZM6.1897 5.3L20.7643 5.3L17.4535 11.3H9.03265L6.1897 5.3ZM7.19733 19.7C5.87782 19.7 4.81021 20.78 4.81021 22.1C4.81021 23.42 5.87782 24.5 7.19733 24.5C8.51684 24.5 9.59644 23.42 9.59644 22.1C9.59644 20.78 8.51684 19.7 7.19733 19.7ZM19.1929 19.7C17.8734 19.7 16.8058 20.78 16.8058 22.1C16.8058 23.42 17.8734 24.5 19.1929 24.5C20.5124 24.5 21.592 23.42 21.592 22.1C21.592 20.78 20.5124 19.7 19.1929 19.7Z" fill="#2B252E"/>
              </svg>
              {numItemsInCart > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#17A9DD',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {numItemsInCart}
                </div>
              )}
            </div>
          </div>
        </div>
          :
        <div className='topNav'>
          <div className='topNav-container'>
            <div className='nav-item-profile' onClick={openProfile}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM6.084 19.536C6.6 18.456 9.744 17.4 12 17.4C14.256 17.4 17.412 18.456 17.916 19.536C16.284 20.832 14.232 21.6 12 21.6C9.768 21.6 7.716 20.832 6.084 19.536ZM19.632 17.796C17.916 15.708 13.752 15 12 15C10.248 15 6.084 15.708 4.368 17.796C3.144 16.188 2.4 14.184 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 14.184 20.856 16.188 19.632 17.796ZM12 4.8C9.672 4.8 7.8 6.672 7.8 9C7.8 11.328 9.672 13.2 12 13.2C14.328 13.2 16.2 11.328 16.2 9C16.2 6.672 14.328 4.8 12 4.8ZM12 10.8C11.004 10.8 10.2 9.996 10.2 9C10.2 8.004 11.004 7.2 12 7.2C12.996 7.2 13.8 8.004 13.8 9C13.8 9.996 12.996 10.8 12 10.8Z" fill="#2B252E"/>
              </svg>
            </div>
            <div className='nav-logo'>
              <Link to='Home' smooth={true} duration={1000}>
                <div>LOHIT CANTEEN</div>
              </Link>
            </div>
            <div className='nav-item-cart' onClick={openCart} style={{ position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535ZM6.1897 5.3L20.7643 5.3L17.4535 11.3H9.03265L6.1897 5.3ZM7.19733 19.7C5.87782 19.7 4.81021 20.78 4.81021 22.1C4.81021 23.42 5.87782 24.5 7.19733 24.5C8.51684 24.5 9.59644 23.42 9.59644 22.1C9.59644 20.78 8.51684 19.7 7.19733 19.7ZM19.1929 19.7C17.8734 19.7 16.8058 20.78 16.8058 22.1C16.8058 23.42 17.8734 24.5 19.1929 24.5C20.5124 24.5 21.592 23.42 21.592 22.1C21.592 20.78 20.5124 19.7 19.1929 19.7Z" fill="#2B252E"/>
              </svg>
              {numItemsInCart > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#17A9DD',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {numItemsInCart}
                </div>
              )}
            </div>
          </div>
        </div>
  )
}

export default TopNav