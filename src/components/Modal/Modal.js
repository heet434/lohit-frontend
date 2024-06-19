import {React,useState, useEffect} from 'react';

import Login from './Contents/Login/Login';
import Signup from './Contents/Signup/Signup';

import './Modal.css';

// General Purpose Modal Component

function PcModal(props) {

    const [visible, setVisible] = useState(true)

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)

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
            <Signup closeModal={closeModal} />
            {/* </div> */}
        </div>
    </div>
  )
}

export default PcModal;
