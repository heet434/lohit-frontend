import React, { useEffect } from 'react'
import {useState} from 'react'

import './Carousel.css'
import LeftIcon from '../../assets/icons/left.svg'
import RightIcon from '../../assets/icons/right.svg'

function Carousel(props) {
    const [visibleItems, setVisibleItems] = useState([])
    const [visibleIndex, setVisibleIndex] = useState([])
    // create a list of div of food items
    const foodItems = props.foodItems.map((item) => {
        return (
            <div className='food-item moveIn' key={item.id}>
                <div className='food-img-mask'>
                    <img src={`https://source.unsplash.com/400x400/?${item.name}`} alt={item.name} />
                </div>
                <div className='food-item-text subtitle'>
                    {item.name}
                </div>
            </div>
        )
    })

    const moveLeft = () => {

        const fooditems = document.querySelectorAll('.food-item');
        fooditems.forEach((item) => {
            item.classList.remove('moveLeft');
            item.classList.remove('moveLeft2');
            item.classList.remove('moveLeft3');
            item.classList.remove('moveLeft4');
            item.classList.remove('moveLeft5');
            item.classList.remove('moveRight');
            item.classList.remove('moveRight2');
            item.classList.remove('moveRight3');
            item.classList.remove('moveRight4');
            item.classList.remove('moveRight5');
        })
        fooditems[1].classList.add('moveLeft');
        fooditems[2].classList.add('moveLeft2');
        fooditems[3].classList.add('moveLeft3');
        fooditems[4].classList.add('moveLeft4');
        fooditems[5].classList.add('moveLeft5');

        let items = [];
        let index = [];
        for (let i =1; i<6; i++){
            items.push(foodItems[visibleIndex[i]]);
            index.push(visibleIndex[i]);
        }
        if(visibleIndex[5]+1<foodItems.length){
            items.push(foodItems[visibleIndex[5]+1]);
            index.push(visibleIndex[5]+1);
        }else{
            items.push(foodItems[0]);
            index.push(0);
        };
        setVisibleItems(items);
        setVisibleIndex(index);
    }

    const moveRight = () => {
        const fooditems = document.querySelectorAll('.food-item');
        fooditems.forEach((item) => {
            item.classList.remove('moveLeft');
            item.classList.remove('moveLeft2');
            item.classList.remove('moveLeft3');
            item.classList.remove('moveLeft4');
            item.classList.remove('moveLeft5');
            item.classList.remove('moveRight');
            item.classList.remove('moveRight2');
            item.classList.remove('moveRight3');
            item.classList.remove('moveRight4');
            item.classList.remove('moveRight5');
        })
        fooditems[0].classList.add('moveRight');
        fooditems[1].classList.add('moveRight2');
        fooditems[2].classList.add('moveRight3');
        fooditems[3].classList.add('moveRight4');
        fooditems[4].classList.add('moveRight5');


        let items = [];
        let index = [];
        if(visibleIndex[0]-1>=0){
            items.push(foodItems[visibleIndex[0]-1]);
            index.push(visibleIndex[0]-1);
        }else{
            items.push(foodItems[foodItems.length-1]);
            index.push(foodItems.length-1);
        }
        for (let i = 0; i<5; i++){
            items.push(foodItems[visibleIndex[i]]);
            index.push(visibleIndex[i]);
        }
        setVisibleItems(items);
        setVisibleIndex(index);
    }

    useEffect(() => {
        let items = []
        for (let i = 0; i < 6; i++) {
            items.push(foodItems[i])
        }
        setVisibleItems(items)
        setVisibleIndex([0,1,2,3,4,5])
    },[])

return (
    <div className='carousel-container'>
        <div className='carousel-button-left' onClick={moveLeft}>
            <img src={LeftIcon} alt='left' />
        </div>
        <div className='carousel-items'>
        {visibleItems}
        </div>
        <div className='carousel-button-right' onClick={moveRight}>
            <img src={RightIcon} alt='right' />
        </div>
    </div>
    )
};

export default Carousel;
