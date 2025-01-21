import {React,useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { authActions } from '../../store/slices/authSlice';
import { modalDisplayActions } from '../../store/slices/modalDisplaySlice';

import Login from './Contents/Login/Login';
import Signup from './Contents/Signup/Signup';
import Profile from './Contents/Profile/Profile';
import Cart from './Contents/Cart/Cart';
import Checkout from './Contents/Checkout/Checkout';
import Orders from './Contents/Orders/Orders';



import './Modal.css';
import axios from 'axios';

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

    const openOrders = () => {
        dispatch(modalDisplayActions.openOrders())
    }

    const openCheckout = () => {
        dispatch(modalDisplayActions.openCheckout())
    }

    // fetch all orders
    // const token = useSelector(state => state.auth.token)
    // useEffect(() => {
    //         axios.get('/api/orders/',{
    //             headers: {
    //                 'Authorization': `Token ${token}`
    //             }
    //         }).then(response => {
    //             console.log(response.data)
    //         }).catch(error => {
    //             console.log(error)
    //         })
    // }
    // , [isLoggedIn])


    const renderContent = () => {
        if(content === 'login' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin = {closeModal}/>
        }else if(content === 'signup' && !isLoggedIn){
            return <Signup closeModal={closeModal} openLogin={openLogin}/>
        }else if(content === 'profile' && isLoggedIn){
            return <Profile closeModal={closeModal} openOrders={openOrders}/>
        }else if(content === 'profile' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin={openProfile}/>
        }else if(content === 'cart' && isLoggedIn){
            return <Cart closeModal={closeModal} openOrders={openOrders} openCheckout={openCheckout}/>
        }else if(content === 'cart' && !isLoggedIn){
            return <Login closeModal={closeModal} openSignup={openSignup} onLogin={openCart}/>
        }else if(content === 'checkout' && isLoggedIn){
            return <Checkout closeModal={closeModal} openOrders={openOrders}/>
        }else if(content === 'orders' && isLoggedIn){
            return <Orders closeModal={closeModal} />
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
