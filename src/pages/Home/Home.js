import {React,useState, useEffect} from 'react'

import './Home.css'

import SearchBar from '../../components/search/SearchBar'
import Carousel from '../../components/carousel/Carousel'

function Home(props) {

    const foodItemsMenu = props.menu
    const foodCategories = props.categories
    
    const searchValue = props.searchValue
    const handleSearch = props.handleSearch

    const setSearchBarOnTop = props.setSearchBarOnTop

    // Effect to check search bar visibility
    // useEffect(() => {
    //     const checkSearchBarVisibility = () => {
    //         const searchBarElement = document.getElementById('searchBar2')
            
    //         if (searchBarElement) {
    //             const rect = searchBarElement.getBoundingClientRect()
    //             const isVisible = (
    //                 rect.top >= 90 &&
    //                 rect.left >= 0 &&
    //                 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //                 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //             )
    //             setSearchBarOnTop(!isVisible)
    //         }
    //     }

    //     // Check visibility on mount and scroll
    //     checkSearchBarVisibility()
    //     window.addEventListener('scroll', checkSearchBarVisibility)
    //     window.addEventListener('resize', checkSearchBarVisibility)

    //     // Cleanup event listeners
    //     return () => {
    //         window.removeEventListener('scroll', checkSearchBarVisibility)
    //         window.removeEventListener('resize', checkSearchBarVisibility)
    //     }
    // }, [])
    useEffect(() => {
        const handleScroll = () => {
            const searchBarElement = document.getElementById('searchBar2')
            
            if (searchBarElement) {
                // Calculate the scroll position relative to the search bar
                const scrollPosition = window.scrollY
                const searchBarOffset = searchBarElement.offsetTop
                
                // Adjust visibility based on scroll position
                // You can fine-tune these values based on your specific layout
                setSearchBarOnTop(!(scrollPosition < searchBarOffset - 90))
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])



  return (
    <div id='Home' className='page'>
        <div className='foodsImgContainer'>
            {!props.isSearchBarOnTop ? 
                <div className='searchBar' id='searchBar2'>
                    <SearchBar menuItems={foodItemsMenu} handleSearch={handleSearch} searchValue={searchValue} />
                </div>:
                <div className='searchBar' style={{visibility: 'hidden'}} id='searchBar2'>
                    <SearchBar menuItems={foodItemsMenu} handleSearch={handleSearch} searchValue={searchValue} />
                </div>
            }
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
