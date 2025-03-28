import React from 'react'

import MenuItem from '../menuItem/MenuItem'
import './FoodCategory.css'

function FoodCategory(props) {

    const menuItemsInCategory = props.menuItems.filter(
        (item) => {
            return item.category.includes(props.categoryName)
        }
    )
    const sortedMenuItems = menuItemsInCategory.sort((a, b) => {
        if (b.is_available !== a.is_available) {
            return b.is_available - a.is_available;
        }
        return b.is_available_now - a.is_available_now;
    });

  return (
    <div className='foodCategory' id={props.idName}>
        <div className='foodCategory-title'>
            {props.categoryName}
        </div>
        <div className='foodCategory-menuItems'>
            {sortedMenuItems.length !== 0 ? (sortedMenuItems.map((item) => {
                return (
                    <MenuItem
                    key={item.id}
                    idBackend={item.id}
                    id={item.id}
                    // itemName={item.name}
                    itemName = {item.item}
                    price={item.price}
                    description={item.description}
                    itemType={item.veg_nonveg_egg}
                    // img={`https://picsum.photos/400`}
                    img={item.image_url}
                    is_available={item.is_available}
                    is_available_now={item.is_available_now}
                    nextTime={item.next_time}
                    />
                )})):
                (<div className='no-items'>
                    No items available
                </div>)}
        </div>
    </div>
  )
}

export default FoodCategory
