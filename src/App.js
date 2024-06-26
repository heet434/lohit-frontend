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
    const fetchFoodCategories = async () => {
        try{
            const response = await axios.get('/api/categories/')
            setFoodCategories(response.data.map((item,index)=>{
                return {name: item.name, id: index, index: index, image: item.image}
            }))
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchMenuItems = async () => {
        try{
            const response = await axios.get('/api/menu/')
            setMenuItems(response.data)
            //console.log(response.data)
          }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchFoodCategories()
        fetchMenuItems()
    },  [])


  return (
    <div className="App">
      <TopNav />
      <Modal />
      <Home menu = {menuItems} categories = {foodCategories}/>
      <Menu menu = {menuItems} categories = {foodCategories}/>
    </div>
  );
}

export default App;
