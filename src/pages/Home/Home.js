import {React,useState} from 'react'
import { animateScroll } from 'react-scroll'

import './Home.css'

import SearchBar from '../../components/search/SearchBar'
import Carousel from '../../components/carousel/Carousel'

import { removeWhiteSpace } from '../../utils/strUtils'



// const foodItems = [
//     {
//       index : 0,
//       id : 1,
//       name : 'Pizza',
//     },
//     {
//       index : 1,
//       id:  2,
//       name :'Burger',
//     },
//     {
//       index : 2,
//       id: 3,
//       name: 'Pasta',
//     },
//     {
//       index : 3,
//       id: 4,
//       name: 'Salad',
//     },
//     {
//       index : 4,
//       id: 5,
//       name: 'Fries',
//     },
//     {
//       index : 5,
//       id: 6,
//       name: 'Ice Cream',
//     },
//     {
//       index : 6,
//       id: 7,
//       name: 'Donut',
//     },
//     {
//       index : 7,
//       id: 8,
//       name: 'Cake',
//     },
//     {
//       index : 8,
//       id: 9,
//       name: 'Pie',
//     },
//     {
//       index : 9,
//       id: 10,
//       name: 'Sushi',
//     },
//     {
//       index : 10,
//       id: 11,
//       name: 'Taco',
//     },
//     {
//       index : 11,
//       id: 12,
//       name: 'Burrito',
//     }
//   ];
function Home(props) {

    const foodItemsMenu = props.menu
    const foodCategories = props.categories
    const [searchValue, setSearchValue] = useState(null)

    const handleSearch = (searchVal) => {
        //console.log(searchVal.value)
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
