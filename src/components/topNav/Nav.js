import React from 'react'
import {Link} from 'react-scroll'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { modalDisplayActions } from '../../store/slices/modalDisplaySlice'
import SearchBar from '../search/SearchBar'

import './Nav.css'
import MenuIcon from '../../assets/icons/menu.svg'
import CartIcon from '../../assets/icons/cart.svg'
import ProfileIcon from '../../assets/icons/profile.svg'


function TopNav({ menu, handleSearch, searchValue }) {
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth)
  const [breakPoint, setBreakPoint] = useState(1)
  const dispatch = useDispatch()

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
    }else if(viewPortWidth > 432){
      setBreakPoint(2)
    }else{
      setBreakPoint(1)
    }
  },[viewPortWidth])

  const openProfile = () => {
    dispatch(modalDisplayActions.openProfile())
  }
  const openCart = () => {
    dispatch(modalDisplayActions.openCart())
  }

  return (
    breakPoint === 3 ? (
      <div className='topNav'>
        <div className='topNav-container'>
          <Link to='Home' smooth={true} duration={1000}>
            <div className='nav-logo'>
              <div>LOHIT</div>
              <div>CANTEEN</div>
            </div>
          </Link>
          <div className='searchBar-container'>
            <SearchBar menuItems={menu || []} handleSearch={handleSearch} searchValue={searchValue} />
          </div>
          <div className='nav-list'>
            <Link to='Menu' smooth={true} duration={1000}>
              <div className='nav-item'>
                <img src={MenuIcon} alt='menu' />
                Menu
              </div>
            </Link>
            <div className='nav-item' onClick={openCart}>
              <img src={CartIcon} alt='cart' />
              Cart
            </div>
            <div className='nav-item' onClick={openProfile}>
              <img src={ProfileIcon} alt='profile' />
              Profile
            </div>
          </div>
        </div>
      </div>
    ) : breakPoint === 2 ? (
      <div className='topNav'>
        <div className='topNav-container'>
          <Link to='Home' smooth={true} duration={1000}>
            <div className='nav-logo'>
              <div>LOHIT CANTEEN</div>
            </div>
          </Link>
          <div className='searchBar-container'>
            <SearchBar menuItems={menu || []} handleSearch={handleSearch} searchValue={searchValue} />
          </div>
          <div className='nav-item-cart' onClick={openCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535Z" fill="#2B252E"/>
            </svg>
          </div>
        </div>
      </div>
    ) : (
      <div className='topNav'>
        <div className='topNav-container'>
          <Link to='Home' smooth={true} duration={1000}>
            <div className='nav-logo'>
              <div>LOHIT CANTEEN</div>
            </div>
          </Link>
          <div className='searchBar-container'>
            <SearchBar menuItems={menu || []} handleSearch={handleSearch} searchValue={searchValue} />
          </div>
          <div className='nav-item-cart' onClick={openCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M17.4535 13.7C18.3532 13.7 19.1449 13.208 19.5527 12.464L23.8471 4.676C24.291 3.884 23.7152 2.9 22.8035 2.9L5.05012 2.9L3.92254 0.5L0 0.5L0 2.9L2.39911 2.9L6.71751 12.008L5.09811 14.936C4.22243 16.544 5.374 18.5 7.19733 18.5L21.592 18.5V16.1H7.19733L8.51684 13.7H17.4535Z" fill="#2B252E"/>
            </svg>
          </div>
        </div>
      </div>
    )
  );
}

export default TopNav
