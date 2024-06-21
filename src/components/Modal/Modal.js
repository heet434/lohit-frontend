import {React,useState, useEffect} from 'react';

import Login from './Contents/Login/Login';
import Signup from './Contents/Signup/Signup';
import Profile from './Contents/Profile/Profile';
import Cart from './Contents/Cart/Cart';
import Checkout from './Contents/Checkout/Checkout';

import './Modal.css';

// General Purpose Modal Component

function PcModal(props) {

    const [visible, setVisible] = useState(false)

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const [content, setContent] = useState(null)

    const closeModal = () => {
        setVisible(false)
    }
    const openModal = () => {
        setVisible(true)
    }


    useEffect(() => {
        if(isUserLoggedIn){
            setContent(<Login closeModal={closeModal} />)
        }else{
            setContent(null)
        }
    }   ,[])

    console.log('visible', visible)
  return (
    visible &&
    <div className='pc-modal-bg'>
        <span className='pc-modal-close-area' onClick={closeModal}>
            {/* Hehe */}
        </span>
        <div className='pc-modal' >
            {/* <div className='pc-modal-content'> */}
            {/* <Login closeModal={closeModal} /> */}
            {/* <Signup closeModal={closeModal} /> */}
            {/* <Profile closeModal={closeModal} /> */}
            {/* <Cart closeModal={closeModal} /> */}
            {/* <Checkout closeModal={closeModal} /> */}
            {/* </div> */}
        </div>
    </div>
  )
}

export default PcModal;
