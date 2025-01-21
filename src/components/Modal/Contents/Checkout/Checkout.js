import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { authActions } from '../../../../store/slices/authSlice';
import './Checkout.css';

function Checkout(props) {
    const dispatch = useDispatch();

    const [selectedMode, setSelectedMode] = useState('Dine-in');
    const allowedModes = ['Dine-in', 'Takeaway', 'Delivery'];

    const phone = useSelector(state => state.auth.phone);
    const address = useSelector(state => state.auth.address);
    const total = useSelector(state => state.cart.totalPrice);

    const totalText = total ? `Total: Rs. ${total}` : 'Total: Rs. 0';

    const changePhone = (event) => {
        dispatch(authActions.changePhone(event.target.value));
    };

    const changeAddress = (event) => {
        dispatch(authActions.changeAddress(event.target.value));
    };

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const checkout = () => {
        // check for phone
        if (!phone) {
            alert('Please enter your phone number');
            return;
        }

        // send the entered phone number to the backend
        axios.post('/api/checkout-phone/', {
            phone: phone,
            address: address
        }).then((response) => {
            if (response.status === 200) {
                console.log("Phone number saved");
            }
        }).catch((error) => {
            console.log(error);
        });

        // if mode is delivery, check for address
        if (selectedMode === 'Delivery' && !address) {
            alert('Please enter your delivery address');
            return;
        }
        console.log("Order Placed");
    };

    return (
        <div className='checkout pc-modal-in' id='checkout'>
            <div className='modal-container'>
                {/* r1 */}
                <div className='modal-close modal-r1' onClick={props.closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="32" viewBox="0 0 15 32" fill="none">
                        <path d="M14.0859 2.77799L11.9677 0.000671387L0.000222206 15.6917L11.9677 31.3828L14.0859 28.6055L4.23671 15.6917L14.0859 2.77799Z" fill="#2B252E" />
                    </svg>
                </div>
                <div className='modal-r1 modal-title'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M12 0.5C5.376 0.5 0 5.876 0 12.5C0 19.124 5.376 24.5 12 24.5C18.624 24.5 24 19.124 24 12.5C24 5.876 18.624 0.5 12 0.5ZM6.084 20.036C6.6 18.956 9.744 17.9 12 17.9C14.256 17.9 17.412 18.956 17.916 20.036C16.284 21.332 14.232 22.1 12 22.1C9.768 22.1 7.716 21.332 6.084 20.036ZM19.632 18.296C17.916 16.208 13.752 15.5 12 15.5C10.248 15.5 6.084 16.208 4.368 18.296C3.144 16.688 2.4 14.684 2.4 12.5C2.4 7.208 6.708 2.9 12 2.9C17.292 2.9 21.6 7.208 21.6 12.5C21.6 14.684 20.856 16.688 19.632 18.296ZM12 5.3C9.672 5.3 7.8 7.172 7.8 9.5C7.8 11.828 9.672 13.7 12 13.7C14.328 13.7 16.2 11.828 16.2 9.5C16.2 7.172 14.328 5.3 12 5.3ZM12 11.3C11.004 11.3 10.2 10.496 10.2 9.5C10.2 8.504 11.004 7.7 12 7.7C12.996 7.7 13.8 8.504 13.8 9.5C13.8 10.496 12.996 11.3 12 11.3Z" fill="#2B252E" />
                    </svg>
                    CHECKOUT
                </div>
                {/* r2 */}
                <div className='modal-r2 modal-input-container'>
                    <div className='modal-input'>
                        <input type='phone' placeholder='Phone' value={phone} onChange={changePhone} />
                    </div>
                </div>
                {/* r3 */}
                <div className='modal-r3 modal-input-container'>
                    <div className='modal-input'>
                        <select value={selectedMode} onChange={handleModeChange}>
                            {allowedModes.map((mode, index) => (
                                <option key={index} value={mode}>{mode}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* r4 */}
                {selectedMode === 'Delivery' && (
                    <div className='modal-r3 modal-input-container'>
                        <div className='modal-input input-title'>
                            <h1>Delivery Address</h1>
                        </div>
                        <div className='modal-input'>
                            <input type='text' placeholder='Address' value={address} onChange={changeAddress} />
                        </div>
                    </div>
                )}
                {/* r5 */}
                {/* display total amount */}
                <div className='modal-r4 modal-input-container'>
                    <div className='modal-input'>
                        <div className='modal-input'>
                            <input type='text' placeholder='Total' value={totalText} readOnly/>
                        </div>
                    </div>
                </div>
                {/* r6 */}
                <div className='modal-r5 modal-button' onClick={checkout}>
                    PLACE ORDER
                </div>
            </div>
        </div>
    );
}

export default Checkout;