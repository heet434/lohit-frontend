import {React} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { animateScroll } from 'react-scroll'

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { removeWhiteSpace } from './utils/strUtils';

import Home from './pages/Home/Home';
import TopNav from './components/topNav/Nav';
import Menu from './pages/Menu/Menu';
import Modal from './components/Modal/Modal';

function App() {

  const [foodCategories, setFoodCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [bestsellers, setBestsellers] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const [isSearchBarOnTop, setIsSearchBarOnTop] = useState(false)

  const setSearchBarOnTop = (isOnTop) => {
    setIsSearchBarOnTop(isOnTop)
  }

  const handleSearch = (searchVal) => {
      setSearchValue(searchVal)
      const element = document.getElementById(removeWhiteSpace(searchVal.value))
      animateScroll.scrollTo(element.offsetTop - 250)
  }

  const formatGoogleDriveUrl = (url) => {

    if (!url) return (
      // return placehold.co image
      'https://placehold.co/400'
    )

    if (url.includes('drive.google.com')) {
      const urlParts = url.split('/')
      const id = urlParts[urlParts.length - 2]
      return `https://drive.google.com/thumbnail?id=${id}`
    }
    return url
  }

    const fetchFoodCategories = async () => {
        try{
            const response = await axios.get('/api/categories/')
            setFoodCategories(response.data.map((item,index)=>{
                // return {name: item.name, id: index, index: index, image: formatGoogleDriveUrl(item.image_url)}
                return {name: item.name, id: index, index: index, image: formatGoogleDriveUrl(item.image)}
            }))
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchMenuItems = async () => {
        try{
            const response = await axios.get('/api/menu/')
            setMenuItems(response.data.map((item,index)=>{
                // return {...item, image_url: formatGoogleDriveUrl(item.image_url)}
                return {...item, image_url: formatGoogleDriveUrl(item.image)}
            } ))
          }
        catch(error){
            console.log(error)
        }
    }

    const fetchBestsellers = async () => {
        try{
            const response = await axios.get('/api/bestsellers/')
            setBestsellers(response.data.map((item,index)=>{
                // return {...item, image_url: formatGoogleDriveUrl(item.image_url)}
                return {...item, image_url: formatGoogleDriveUrl(item.image)}
            } ))
            
          }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchFoodCategories()
        fetchMenuItems()
        fetchBestsellers()
    },  [])


  return (
    <div className="App">
      <ToastContainer />
      <TopNav menu = {menuItems} handleSearch = {handleSearch} searchValue = {searchValue} isSearchBarOnTop = {isSearchBarOnTop}/>
      <Modal />
      <Home menu = {menuItems} categories = {foodCategories} handleSearch = {handleSearch} searchValue = {searchValue} isSearchBarOnTop = {isSearchBarOnTop} setSearchBarOnTop = {setSearchBarOnTop}/>
      <Menu menu = {menuItems} categories = {foodCategories} bestsellers = {bestsellers}/>
    </div>
  );
}

export default App;
