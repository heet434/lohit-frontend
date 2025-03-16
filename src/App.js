import {React} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Home from './pages/Home/Home';
import TopNav from './components/topNav/Nav';
import Menu from './pages/Menu/Menu';
import Modal from './components/Modal/Modal';

function App() {

  const [foodCategories, setFoodCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [bestsellers, setBestsellers] = useState([])

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
      <TopNav />
      <Modal />
      <Home menu = {menuItems} categories = {foodCategories}/>
      <Menu menu = {menuItems} categories = {foodCategories} bestsellers = {bestsellers}/>
    </div>
  );
}

export default App;
