import React from 'react'
import { animateScroll } from 'react-scroll'
import './Home.css'
import Carousel from '../../components/carousel/Carousel'
import { removeWhiteSpace } from '../../utils/strUtils'

function Home(props) {
    const foodCategories = props.categories

    return (
        <div id='Home' className='page'>
            <div className='foodsImgContainer'>
            </div>
            <div className='content'>
                <h3>
                    Pick and Eat!
                </h3>
                <div className='Carousel'>
                    <Carousel foodItems={foodCategories} />
                </div>
            </div>
        </div>
    )
}

export default Home
