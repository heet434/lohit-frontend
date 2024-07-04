import React from 'react'

import MenuItem from '../menuItem/MenuItem'
import './FoodCategory.css'

// const menuItems = [
//     {
//         id: 1,
//         name: 'Margherita',
//         price: 200,
//         description: 'A hugely popular margherita, with a deliciously tangy single cheese topping',
//         waitingTime: 20,
//         itemType: 'veg'
//     },
//     {
//         id: 2,
//         name: 'Farmhouse',
//         price: 300,
//         description: 'A pizza that goes ballistic on veggies! Check out this mouth watering overload of crunchy, crisp capsicum, succulent mushrooms and fresh tomatoes',
//         waitingTime: 30,
//         itemType: 'egg'
//     },
//     {
//         id: 3,
//         name: 'Peppy Paneer',
//         price: 250,
//         description: 'Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!',
//         waitingTime: 25,
//         itemType: 'non-veg'
//     },
//     {
//         id: 4,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 5,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 6,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 7,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 8,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 9,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 10,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
//     {
//         id: 11,
//         name: 'Mexican Green Wave',
//         price: 350,
//         description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes andjalap',
//         waitingTime: 35,
//         itemType: 'veg'
//     },
// ]

function FoodCategory(props) {

    const menuItemsInCategory = props.menuItems.filter(
        (item) => {
            // check if props.categoryName is present in item.category array which is a list of categories
            //console.log(item.category)
            return item.category.includes(props.categoryName)
        }
    )

  return (
    <div className='foodCategory' id={props.idName}>
        <div className='foodCategory-title'>
            {props.categoryName}
        </div>
        <div className='foodCategory-menuItems'>
            {menuItemsInCategory.map((item) => {
                if(item.is_available){
                return (
                    <MenuItem
                    key={item.id}
                    idBackend={item.id}
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

export default FoodCategory
