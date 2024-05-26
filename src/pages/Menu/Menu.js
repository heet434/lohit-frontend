import React from 'react'
import { useState } from 'react';
import { Link } from 'react-scroll';

import { removeWhiteSpace } from '../../utils/strUtils';

import './Menu.css'
import FoodCategory from '../../components/FoodCategory/FoodCategory';

function Menu() {

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
    
    // create a list of div for foodItems
    const foodCategoriesList = foodCategories.map((item)=>{
        return(
          <Link to={removeWhiteSpace(item.name)} smooth={true} duration={1000} key={item.id} offset={-150} activeClass='activeSide' spy={true}>
            <div className='foodItemSide border-black-right' key={item.id}>
                {item.name}
            </div>
          </Link>
        )
    })


  return (
    <div className='page' id='Menu'>
        <div className='menu-navbar-container'>
                <div className='menu-navbar'>
                    <Link to='menu-container' smooth={true} duration={1000} offset={-200}spy={true} activeClass='activeTop'>
                      <div className='menu-navbar-item'>
                          Menu
                      </div>
                    </Link>
                    <div className='menu-navbar-item'>
                        Bestsellers
                    </div>
                    <div className='menu-navbar-item'>
                        Saved
                    </div>
                    <div className='menu-navbar-item'>
                        Details
                    </div>
                </div>
        </div>
        
        <div className='menu-container' id='menu-container'>
          {/* <div className='menu-container-div'> */}
            <div className='menu-sideNav-container'>
                {/* <div className='price-range-slider-container'>
                    <div className='price-range-slider'>
                        <div className='price-range-slider-title'>
                            <div className='menu-page-title'>Price Range</div>
                            <div className='menu-page-subtitle'>(Rs.)</div>
                        </div>
                        <div className='price-range-slider-input'>
                            <input type='range' min='0' max='500' value={priceRange} onChange={sliderChange} />
                        </div>
                    </div>
                </div> */}
                <div className='orderNav-container'>
                    <div className='orderNav-side'>
                        <div className='menu-page-title orderNav-title'>
                            Order
                        </div>
                        {foodCategoriesList}
                        <div className='menu-page-title orderNav-title'>
                          {/* End */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='menu-items-container'>
                <div className='menu-title menu-page-title'>
                    Menu
                </div>
                <div className='veg-nonveg-container'>
                    <div className='veg-indicator menu-page-description-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <rect y="0.5" width="16" height="16" rx="2" fill="#00BA34"/>
                            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
                        </svg>
                        veg only
                    </div>
                    <div className='egg-indicator menu-page-description-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <rect y="0.5" width="16" height="16" rx="2" fill="#FFD700"/>
                            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
                        </svg>
                        contains egg
                    </div>
                    <div className='nonveg-indicator menu-page-description-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <rect y="0.5" width="16" height="16" rx="2" fill="#FF0000"/>
                            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
                        </svg>
                        non-veg only
                    </div>
                </div>
                {foodCategories.map((item) => {
                    return(
                        <FoodCategory key={item.id} categoryName={item.name} idName={removeWhiteSpace(item.name)}/>
                    )
                })}
            </div>
          {/* </div> */}
        </div>
    </div>
  )
}

export default Menu
