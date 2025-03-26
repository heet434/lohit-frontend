import {React,useState} from 'react'
import { animateScroll } from 'react-scroll'

import './Home.css'

import SearchBar from '../../components/search/SearchBar'
import Carousel from '../../components/carousel/Carousel'

import { removeWhiteSpace } from '../../utils/strUtils'

function Home(props) {

    const foodItemsMenu = props.menu
    const foodCategories = props.categories
    const [searchValue, setSearchValue] = useState(null)

    const handleSearch = (searchVal) => {
        setSearchValue(searchVal)
        const element = document.getElementById(removeWhiteSpace(searchVal.value))
        animateScroll.scrollTo(element.offsetTop - 250)
    }

  return (
    <div id='Home' className='page'>
        <div className='foodsImgContainer'>
            <div className='searchBar'>
                <SearchBar menuItems={foodItemsMenu} handleSearch={handleSearch} searchValue={searchValue} />
            </div>
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
