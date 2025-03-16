import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-scroll';
import { removeWhiteSpace } from '../../utils/strUtils';
import './Carousel.css';
import LeftIcon from '../../assets/icons/left.svg';
import RightIcon from '../../assets/icons/right.svg';

function Carousel(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const itemsPerScroll = 3; // Number of items to scroll
    const itemsPerView = 5; // Number of items visible

    // Create circular array of items
    const createCircularArray = useCallback(() => {
        const items = [...props.foodItems];
        const itemsNeeded = itemsPerView * 2; // Extra items for smooth circular scrolling
        while (items.length < itemsNeeded) {
            items.push(...props.foodItems);
        }
        return items;
    }, [props.foodItems]);

    const [circularItems, setCircularItems] = useState(createCircularArray());

    useEffect(() => {
        setCircularItems(createCircularArray());
    }, [props.foodItems, createCircularArray]);

    const foodItems = circularItems.map((item, index) => (
        <div className='food-item' key={`${item.id}-${index}`}>
            <Link to={removeWhiteSpace(item.name)} smooth={true} duration={1000} offset={-140}>
                <div className='food-img-mask'>
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        loading="eager"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                        }}
                    />
                </div>
            </Link>
            <div className='food-item-text subtitle'>
                {item.name}
            </div>
        </div>
    ));

    const moveLeft = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - itemsPerScroll;
            const carousel = document.querySelector('.carousel-items');
            
            if (newIndex < 0) {
                // Jump to end when reaching start
                const lastPossibleIndex = foodItems.length - itemsPerView;
                carousel.scrollTo({
                    left: (lastPossibleIndex * carousel.offsetWidth) / itemsPerView,
                    behavior: 'smooth'
                });
                return lastPossibleIndex;
            }

            carousel.scrollTo({
                left: (newIndex * carousel.offsetWidth) / itemsPerView,
                behavior: 'smooth'
            });
            return newIndex;
        });
    };

    const moveRight = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + itemsPerScroll;
            const carousel = document.querySelector('.carousel-items');
            
            if (newIndex >= foodItems.length - itemsPerView) {
                // Jump to start when reaching end
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
                return 0;
            }

            carousel.scrollTo({
                left: (newIndex * carousel.offsetWidth) / itemsPerView,
                behavior: 'smooth'
            });
            return newIndex;
        });
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 2;
        e.currentTarget.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = (e) => {
        const carousel = e.currentTarget;
        const newIndex = Math.round((carousel.scrollLeft / carousel.offsetWidth) * itemsPerView);
        setCurrentIndex(newIndex);

        // Handle circular scrolling
        if (carousel.scrollLeft === 0) {
            setCurrentIndex(0);
        } else if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            setCurrentIndex(0);
            carousel.scrollTo({ left: 0 });
        }
    };

    return (
        <div className='carousel-container'>
            <button 
                className='carousel-button carousel-button-left' 
                onClick={moveLeft}
            >
                <img src={LeftIcon} alt='left' />
            </button>
            
            <div 
                className='carousel-items'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={handleScroll}
            >
                {foodItems}
            </div>

            <button 
                className='carousel-button carousel-button-right' 
                onClick={moveRight}
            >
                <img src={RightIcon} alt='right' />
            </button>
        </div>
    );
}

export default Carousel;
