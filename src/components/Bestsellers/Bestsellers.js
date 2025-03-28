import React from 'react'

import MenuItem from '../menuItem/MenuItem'
import './Bestsellers.css'

function Bestsellers(props) {

    const sortedMenuItems = props.bestsellers.sort((a, b) => {
        if (b.is_available !== a.is_available) {
            return b.is_available - a.is_available;
        }
        return b.is_available_now - a.is_available_now;
    });


  return (
    <div className='foodCategory' id='bestsellers'>
        <div className='foodCategory-title'>
            {props.categoryName}
        </div>
        <div className='foodCategory-menuItems'>
            {sortedMenuItems.map((item) => {
                if(item.is_available){
                return (
                    <MenuItem
                    key={item.id}
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
                    nextTime={item.time}
                    />
                )}else{
                return null
            }
            })}
        </div>
    </div>
  )
}

export default Bestsellers;
