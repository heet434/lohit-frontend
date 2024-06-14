import React, { useEffect } from 'react'
import {useState} from 'react'
import {Link} from 'react-scroll'
import { removeWhiteSpace } from '../../utils/strUtils'
import './Carousel.css'
import LeftIcon from '../../assets/icons/left.svg'
import RightIcon from '../../assets/icons/right.svg'

function Carousel(props) {
    const [visibleItems, setVisibleItems] = useState([])
    const [visibleIndex, setVisibleIndex] = useState([])

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50 

    const [numItems, setNumItems] = useState(6)
    
    const foodItems = props.foodItems.map((item) => {
        return (
                <div className='food-item moveIn' key={item.id}>
                    <Link to={removeWhiteSpace(item.name)} smooth={true} duration={1000} offset={-140}>
                        <div className='food-img-mask'>
                            <img src={`https://picsum.photos/400`} alt={item.name} />
                        </div>
                        <div className='food-item-text subtitle'>
                            {item.name}
                        </div>
                    </Link>
                </div>
        )
    })

    useEffect(() => {
        var num = 6
        if(window.innerWidth < 834 && window.innerWidth > 428) {
            setNumItems(5)
            num = 5
        }else if(window.innerWidth < 428) {
            setNumItems(5)
            num = 20
        }

        let items = []
        
        for (let i = 0; i < num; i++) {
            items.push(foodItems[i])
        }
        setVisibleItems(items)
        let index = []
        for (let i = 0; i < num; i++) {
            index.push(i)
        }
        setVisibleIndex(index)
        //console.log("numItems: ", numItems)
    },[])

    const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    //if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
    // add your conditional logic here
    if(isLeftSwipe){
        moveLeft()
    }
    if(isRightSwipe){
        moveRight()
    }
    }

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
        if(fooditems.length>4) {fooditems[4].classList.add('moveLeft4');}
        if(fooditems.length>5) {fooditems[5].classList.add('moveLeft5');}

        let items = [];
        let index = [];
        //console.log(visibleIndex);
        for (let i =1; i<numItems; i++){
            items.push(foodItems[visibleIndex[i]]);
            index.push(visibleIndex[i]);
        }
        if(visibleIndex[visibleIndex.length-1]+1<foodItems.length){
            items.push(foodItems[visibleIndex[numItems-1]+1]);
            index.push(visibleIndex[numItems-1]+1);
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
        if(fooditems.length>4) {fooditems[4].classList.add('moveRight5');}


        let items = [];
        let index = [];
        if(visibleIndex[0]-1>=0){
            items.push(foodItems[visibleIndex[0]-1]);
            index.push(visibleIndex[0]-1);
        }else{
            items.push(foodItems[foodItems.length-1]);
            index.push(foodItems.length-1);
        }
        for (let i = 0; i<numItems-1; i++){
            items.push(foodItems[visibleIndex[i]]);
            index.push(visibleIndex[i]);
        }
        setVisibleItems(items);
        setVisibleIndex(index);
    }


return (
    <div className='carousel-container' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
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
