import React from 'react';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import { removeWhiteSpace } from '../../utils/strUtils';
import './Menu.css';
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import Bestsellers from '../../components/Bestsellers/Bestsellers';

function Menu(props) {
    const [itemsOnDisplay, setItemsOnDisplay] = useState(props.menu || []);
    const [filters, setFilters] = useState({
        veg: false,
        egg: false,
        non_veg: false,
    });

    useEffect(() => {
        setItemsOnDisplay(props.menu);
    }, [props.menu]);

    const [vegIcon, setVegIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#00BA34" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
    const [eggIcon, setEggIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#FFD700" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
    const [nonVegIcon, setNonVegIcon] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke="#FF0000" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );

    const toggleFilter = (type) => {
        const newFilters = { ...filters, [type]: !filters[type] };
        setFilters(newFilters);

        const filledSvg = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <rect y="0.5" width="16" height="16" rx="2" fill={type === 'veg' ? '#00BA34' : type === 'egg' ? '#FFD700' : '#FF0000'}/>
                <path d="M5.86339 11.0826L3.08339 8.30263L2.13672 9.24263L5.86339 12.9693L13.8634 4.9693L12.9234 4.0293L5.86339 11.0826Z" fill="#F3F3E7"/>
            </svg>
        );
        const emptySvg = (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" fill="#F3F3E7" stroke={type === 'veg' ? '#00BA34' : type === 'egg' ? '#FFD700' : '#FF0000'} strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        );

        if (type === 'veg') {
            setVegIcon(newFilters.veg ? filledSvg : emptySvg);
        } else if (type === 'egg') {
            setEggIcon(newFilters.egg ? filledSvg : emptySvg);
        } else if (type === 'non_veg') {
            setNonVegIcon(newFilters.non_veg ? filledSvg : emptySvg);
        }

        const filteredItems = props.menu.filter((item) => {
            if (!newFilters.veg && !newFilters.egg && !newFilters.non_veg) {
                return true;
            }
            return (
                (newFilters.veg && item.veg_nonveg_egg === 'veg') ||
                (newFilters.egg && item.veg_nonveg_egg === 'egg') ||
                (newFilters.non_veg && item.veg_nonveg_egg === 'non_veg')
            );
        });

        setItemsOnDisplay(filteredItems);
    };

    const foodCategories = props.categories || [];

    const foodCategoriesList = foodCategories.map((item) => (
        <Link to={removeWhiteSpace(item.name)} smooth={true} duration={1000} key={item.id} offset={-130} activeClass='activeSide' spy={true}>
            <div className='foodItemSide border-black-right' key={item.id}>
                {item.name}
            </div>
        </Link>
    ));

    const bestsellers = props.bestsellers || [];

    return (
        <div className='page' id='Menu'>
            <div className='menu-navbar-container'>
                <div className='menu-navbar'>
                    <Link to='menu-items-category-wise' smooth={true} duration={1000} offset={-160} spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Menu
                        </div>
                    </Link>
                    <Link to='bestsellers' smooth={true} duration={1000} offset={-160} spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Bestsellers
                        </div>
                    </Link>
                    <Link to='offers' smooth={true} duration={1000} offset={-160} spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Offers
                        </div>
                    </Link>
                    <Link to='restaurant-details' smooth={true} duration={1000} offset={-160} spy={true} activeClass='activeTop'>
                        <div className='menu-navbar-item'>
                            Details
                        </div>
                    </Link>
                </div>
            </div>

            <div className='menu-container' id='menu-container'>
                <div className='menu-sideNav-container'>
                    <div className='orderNav-container'>
                        <div className='orderNav-side'>
                            {/* <div className='menu-page-title orderNav-title'>
                                Sections
                            </div> */}
                            {foodCategoriesList}
                            <div className='menu-page-title orderNav-title'>
                                {/* End */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='menu-items-container'>
                    {/* <div className='menu-title menu-page-title'>
                        Menu
                    </div> */}
                    <div className='veg-nonveg-container'>
                        <div className='veg-indicator menu-page-description-text' onClick={() => toggleFilter('veg')}>
                            {vegIcon}
                            veg
                        </div>
                        <div className='egg-indicator menu-page-description-text' onClick={() => toggleFilter('egg')}>
                            {eggIcon}
                            contains egg
                        </div>
                        <div className='nonveg-indicator menu-page-description-text' onClick={() => toggleFilter('non_veg')}>
                            {nonVegIcon}
                            non-veg
                        </div>
                    </div>
                    <div className='menu-items-category-wise' id='menu-items-category-wise'>
                        {foodCategories.map((item) => (
                            <FoodCategory key={item.id} categoryName={item.name} idName={removeWhiteSpace(item.name)} menuItems={itemsOnDisplay} />
                        ))}
                    </div>
                    <Bestsellers categoryName="Bestsellers" bestsellers={bestsellers} />
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
            </div>
        </div>
    );
}

export default Menu;