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
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    console.log(window.innerWidth)
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const fetchPromise = Promise.all([
        axios.get('/api/categories/'),
        axios.get('/api/menu/'),
        axios.get('/api/bestsellers/')
      ]);

      // Race between timeout and fetch
      const [categoriesRes, menuRes, bestsellersRes] = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]);

      if (!categoriesRes?.data || !menuRes?.data || !bestsellersRes?.data) {
        throw new Error('Invalid data received from server');
      }

      setFoodCategories(categoriesRes.data.map((item, index) => ({
        name: item.name,
        id: index,
        index: index,
        image: item.image
      })));

      setMenuItems(menuRes.data.map(item => ({
        ...item,
        image_url: item.image
      })));

      setBestsellers(bestsellersRes.data.map(item => ({
        ...item,
        image_url: item.image
      })));

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
      // Set empty arrays to prevent undefined errors
      setFoodCategories([]);
      setMenuItems([]);
      setBestsellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your menu...</p>
      </div>
    );
  }

  // Show error but still render the app with empty data
  return (
    <div className="App">
      <TopNav />
      <Modal />
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      )}
      <Home menu={menuItems} categories={foodCategories}/>
      <Menu menu={menuItems} categories={foodCategories} bestsellers={bestsellers}/>
    </div>
  );
}

export default App;
