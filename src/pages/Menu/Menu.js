import React from 'react'
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';


import { removeWhiteSpace } from '../../utils/strUtils';

import './Menu.css'
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import Bestsellers from '../../components/Bestsellers/Bestsellers';
import { use } from 'react';

function Menu(props) {

    //console.log(props)

    const [itemsOnDisplay, setItemsOnDisplay] = useState([])
    const [isVegDisplayed, setIsVegDisplayed] = useState(true)
    const [isEggDisplayed, setIsEggDisplayed] = useState(true)
    const [isNonVegDisplayed, setIsNonVegDisplayed] = useState(true)

    useEffect(() => {
        setItemsOnDisplay(props.menu)
    }   ,  [props.menu])

    const [vegIcon, setVegIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" rx="2" fill="#00BA34"/>
            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
        </svg>)
    const [eggIcon, setEggIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" rx="2" fill="#FFD700"/>
            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
        </svg>)
    const [nonVegIcon, setNonVegIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" rx="2" fill="#FF0000"/>
            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
        </svg>)

    const addItemsOfType = (type) => {
        let fillColor = '#00BA34'
        type === 'veg' ? fillColor='#00BA34' : type === 'egg' ? fillColor= '#FFD700' : fillColor = '#FF0000'

        const filledSvg = 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" rx="2" fill={fillColor}/>
            <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
        </svg>
        type === 'veg' ? setVegIcon(filledSvg) : type === 'egg' ? setEggIcon(filledSvg) : setNonVegIcon(filledSvg)

        let itemsToBeAdded = props.menu.filter((item) => {
            return item.veg_nonveg_egg === type
        })
        console.log(itemsToBeAdded)
        setItemsOnDisplay([...itemsOnDisplay, ...itemsToBeAdded])
    }
    const removeItemsOfType = (type) => {
        let borderColour = '#00BA34'
        type === 'veg' ? borderColour='#00BA34' : type === 'egg' ? borderColour= '#FFD700' : borderColour = '#FF0000'

        const emptySvg = 
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke={borderColour} strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        type === 'veg' ? setVegIcon(emptySvg) : type === 'egg' ? setEggIcon(emptySvg) : setNonVegIcon(emptySvg)
        
        let itemsToBeRemoved = itemsOnDisplay.filter((item) => {
            return item.veg_nonveg_egg === type
        })
        setItemsOnDisplay(itemsOnDisplay.filter((item) => {
            return !itemsToBeRemoved.includes(item)
        }))
    }

    // const [foodCategories, setFoodCategories] = useState([])
    // const [menuItems, setMenuItems] = useState([])
    // const fetchFoodCategories = async () => {
    //     try{
    //         const response = await axios.get('/api/categories/')
    //         setFoodCategories(response.data.map((item,index)=>{
    //             return {name: item.name, id: index, index: index}
    //         }))
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }
    // const fetchMenuItems = async () => {
    //     try{
    //         const response = await axios.get('/api/menu/')
    //         setMenuItems(response.data)
    //         //console.log(response.data)
    //       }
    //     catch(error){
    //         console.log(error)
    //     }
    // }
    
    // useEffect(() => {
    //     fetchFoodCategories()
    //     fetchMenuItems()
    // },  [])
    const foodCategories = props.categories
    
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

    const bestsellers = props.bestsellers
    


  return (
    <div className='page' id='Menu'>
        <div className='menu-navbar-container'>
                <div className='menu-navbar'>
                    <Link to='menu-container' smooth={true} duration={1000} offset={-160}spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Menu
                        </div>
                    </Link>
                    <Link to='bestsellers' smooth={true} duration={1000} offset={-160}spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Bestsellers
                        </div>
                    </Link>
                    <Link to='offers' smooth={true} duration={1000} offset={-160}spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            {/* Saved */}
                            Offers
                        </div>
                    </Link>
                    <Link to='restaurant-details' smooth={true} duration={1000} offset={-160}spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Details
                        </div>
                    </Link>
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
                    <div className='veg-indicator menu-page-description-text' onClick={() => {
                        isVegDisplayed ? removeItemsOfType('veg') : addItemsOfType('veg')
                        setIsVegDisplayed(!isVegDisplayed)
                    }}>
                        {vegIcon}
                        veg only
                    </div>
                    <div className='egg-indicator menu-page-description-text' onClick={() => {
                        isEggDisplayed ? removeItemsOfType('egg') : addItemsOfType('egg')
                        setIsEggDisplayed(!isEggDisplayed)
                    }}>
                        {eggIcon}
                        contains egg
                    </div>
                    <div className='nonveg-indicator menu-page-description-text' onClick={() => {
                        isNonVegDisplayed ? removeItemsOfType('non_veg') : addItemsOfType('non_veg')
                        setIsNonVegDisplayed(!isNonVegDisplayed)
                    }}>
                        {nonVegIcon}
                        non-veg only
                    </div>
                </div>
                {foodCategories.map((item) => {
                    return(
                        <FoodCategory key={item.id} categoryName={item.name} idName={removeWhiteSpace(item.name)} menuItems = {itemsOnDisplay} />
                    )
                })}
                <Bestsellers categoryName="Bestsellers" bestsellers = {bestsellers}/>
                <div className='menu-page-title' id='offers'>
                    Offers
                </div>
                <div className='offers-content'>
                    <div className='offers-in'>
                        <div className='offers-text'>No offers available</div>
                    </div>
                </div>
                <div className='menu-page-title restaurant-details' id='restaurant-details'>
                    Details
                </div>
                <div className='restaurant-details-content'>
                    <div className='restaurant-details-in'>
                        <ul>
                            <li><div>Contact: +91 9010075784</div></li>
                            <li><div>Lohit canteen is located in Lohit hostel.</div></li>
                            <li><div>For any queries, please contact the number provided.</div></li>
                            <li><div>Website is a joint project by <b>Heet, Aditi, Varun and Shamith.</b></div></li>
                        </ul>
                    </div>
                </div>
            </div>
          {/* </div> */}
        </div>
    </div>
  )
}

export default Menu
