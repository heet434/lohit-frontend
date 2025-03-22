import React from 'react'

import MenuItem from '../menuItem/MenuItem'
import './Bestsellers.css'

function Bestsellers(props) {

    const menuItemsInCategory = props.bestsellers


  return (
    <div className='foodCategory' id='bestsellers'>
        <div className='foodCategory-title'>
            {props.categoryName}
        </div>
        <div className='foodCategory-menuItems'>
            {menuItemsInCategory.map((item) => {
                if(item.is_available){
                return (
                    <MenuItem
                    key={item.id}
                    id={item.id}
                    // itemName={item.name}
                    itemName = {item.item}
                    price={item.price}
                    description={item.description}
                    waitingTime={item.avg_time_taken}
                    itemType={item.veg_nonveg_egg}
                    // img={`https://picsum.photos/400`}
                    img={item.image_url}
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
