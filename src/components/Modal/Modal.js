import {React} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { modalDisplayActions } from '../../store/slices/modalDisplaySlice';

import Login from './Contents/Login/Login';
import Profile from './Contents/Profile/Profile';
import Cart from './Contents/Cart/Cart';
import Checkout from './Contents/Checkout/Checkout';
import Orders from './Contents/Orders/Orders';



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

    const renderContent = () => {
        if(content === 'login' && !isLoggedIn){
            return <Login closeModal={closeModal} onLogin = {closeModal}/>
        }else if(content === 'profile' && isLoggedIn){
            return <Profile closeModal={closeModal} openOrders={openOrders}/>
        }else if(content === 'profile' && !isLoggedIn){
            return <Login closeModal={closeModal} onLogin={openProfile}/>
        }else if(content === 'cart' && isLoggedIn){
            return <Cart closeModal={closeModal} openOrders={openOrders} openCheckout={openCheckout}/>
        }else if(content === 'cart' && !isLoggedIn){
            return <Login closeModal={closeModal} onLogin={openCart}/>
        }else if(content === 'checkout' && isLoggedIn){
            return <Checkout closeModal={closeModal} openOrders={openOrders}/>
        }else if(content === 'orders' && isLoggedIn){
            return <Orders closeModal={closeModal} openCart={openCart}/>
        }else{
            return <Login closeModal={closeModal} onLogin = {closeModal}/>
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
