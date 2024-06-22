import {React,useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { authActions } from '../../store/slices/authSlice';
import { modalDisplayActions } from '../../store/slices/modalDisplaySlice';

import Login from './Contents/Login/Login';
import Signup from './Contents/Signup/Signup';
import Profile from './Contents/Profile/Profile';
import Cart from './Contents/Cart/Cart';
import Checkout from './Contents/Checkout/Checkout';



import './Modal.css';

// General Purpose Modal Component

function PcModal(props) {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    // const [visible, setVisible] = useState(false)
    const display = useSelector(state => state.modalDisplay.display)
    const content = useSelector(state => state.modalDisplay.content)

    const closeModal = () => {
        dispatch(modalDisplayActions.close())
    }

    const openSignup = () => {
        dispatch(modalDisplayActions.openSignup())
    }
    const openLogin = () => {
        dispatch(modalDisplayActions.openLogin())
    }
    const openProfile = () => {
        dispatch(modalDisplayActions.openProfile())
    }
    const openCart = () => {
        dispatch(modalDisplayActions.openCart())
    }

    // const renderContent = () => {
    //     switch(content){
    //         case 'login':
    //             return <Login closeModal={closeModal} openSignup={openSignup}/>
    //         case 'signup':
    //             return <Signup closeModal={closeModal} />
    //         case 'profile' && isLoggedIn:
    //             return <Profile closeModal={closeModal} />
    //         case 'cart' && isLoggedIn:
    //             return <Cart closeModal={closeModal} />
    //         case 'checkout' && isLoggedIn:
    //             return <Checkout closeModal={closeModal} />
    //         default:
    //             return <Login closeModal={closeModal} openSignup={openSignup}/>
    //     }
    // }

    const renderContent = () => {
        if(content === 'login' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin = {closeModal}/>
        }else if(content === 'signup' && !isLoggedIn){
            return <Signup closeModal={closeModal} openLogin={openLogin}/>
        }else if(content === 'profile' && isLoggedIn){
            return <Profile closeModal={closeModal} />
        }else if(content === 'profile' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin={openProfile}/>
        }else if(content === 'cart' && isLoggedIn){
            return <Cart closeModal={closeModal} />
        }else if(content === 'cart' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin={openCart}/>
        }else if(content === 'checkout' && isLoggedIn){
            return <Checkout closeModal={closeModal} />
        }else{
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin = {closeModal}/>
        }
    }
    
  return (
    display &&
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
            {renderContent()}
        </div>
    </div>
  )
}

export default PcModal;
