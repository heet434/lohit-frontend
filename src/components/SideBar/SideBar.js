import React from 'react'
import {Link} from 'react-scroll'

import './SideBar.css'
import { removeWhiteSpace } from '../../utils/strUtils';

function SideBar() {


  const foodCategories = [
    {
      index : 0,
      id : 1,
      name : 'Pizza',
    },
    {
      index : 1,
      id:  2,
      name :'Burger',
    },
    {
      index : 2,
      id: 3,
      name: 'Pasta',
    },
    {
      index : 3,
      id: 4,
      name: 'Salad',
    },
    {
      index : 4,
      id: 5,
      name: 'Fries',
    },
    {
      index : 5,
      id: 6,
      name: 'Ice Cream',
    },
    {
      index : 6,
      id: 7,
      name: 'Donut',
    },
    {
      index : 7,
      id: 8,
      name: 'Cake',
    },
    {
      index : 8,
      id: 9,
      name: 'Pie',
    },
    {
      index : 9,
      id: 10,
      name: 'Sushi',
    },
    {
      index : 10,
      id: 11,
      name: 'Taco',
    },
    {
      index : 11,
      id: 12,
      name: 'Burrito',
    }
  ];



  return (
    <div className='SideBar'>
      <div className='SideBar-content'>
        <div className='SideBar-Profile'>
          Profile
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
            <path d="M16.5 0.5C7.668 0.5 0.5 7.668 0.5 16.5C0.5 25.332 7.668 32.5 16.5 32.5C25.332 32.5 32.5 25.332 32.5 16.5C32.5 7.668 25.332 0.5 16.5 0.5ZM8.612 26.548C9.3 25.108 13.492 23.7 16.5 23.7C19.508 23.7 23.716 25.108 24.388 26.548C22.212 28.276 19.476 29.3 16.5 29.3C13.524 29.3 10.788 28.276 8.612 26.548ZM26.676 24.228C24.388 21.444 18.836 20.5 16.5 20.5C14.164 20.5 8.612 21.444 6.324 24.228C4.692 22.084 3.7 19.412 3.7 16.5C3.7 9.444 9.444 3.7 16.5 3.7C23.556 3.7 29.3 9.444 29.3 16.5C29.3 19.412 28.308 22.084 26.676 24.228ZM16.5 6.9C13.396 6.9 10.9 9.396 10.9 12.5C10.9 15.604 13.396 18.1 16.5 18.1C19.604 18.1 22.1 15.604 22.1 12.5C22.1 9.396 19.604 6.9 16.5 6.9ZM16.5 14.9C15.172 14.9 14.1 13.828 14.1 12.5C14.1 11.172 15.172 10.1 16.5 10.1C17.828 10.1 18.9 11.172 18.9 12.5C18.9 13.828 17.828 14.9 16.5 14.9Z" fill="#2B252E"/>
          </svg>
        </div>
        <div className='SideBar-Menu-Title'>
            Menu
        </div>
        <div className='SideBar-Menu-Items'>
            {
              foodCategories.map((category, index) => (
                <Link
                  key={index}
                  activeClass='active'
                  to={removeWhiteSpace(category.name)}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <div className='SideBar-Menu-Item'>
                    {category.name}
                  </div>
                </Link>
              ))
            }
        </div>
      </div>
    </div>
  )
}

export default SideBar
