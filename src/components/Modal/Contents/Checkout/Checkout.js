import React from 'react'

import './Checkout.css'

function Checkout(props) {
  return (
    <div className='user-checkout pc-modal-in' id='checkout'>
        <div className = 'modal-container'>
            {/* r1 */}
            <div className='modal-close modal-r1' onClick={props.closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="32" viewBox="0 0 15 32" fill="none">
                    <path d="M14.0859 2.77799L11.9677 0.000671387L0.000222206 15.6917L11.9677 31.3828L14.0859 28.6055L4.23671 15.6917L14.0859 2.77799Z" fill="#2B252E"/>
                </svg>
            </div>
            <div className='modal-r1 modal-title'>
                CHECKOUT
            </div>
            {/* r2 */}
            <div className='modal-r2 modal-input-container'>
                <div className='modal-input'>
                    <label htmlFor='name' className='modal-input-label'>Contact Details</label>
                    <input type='text' id='name' placeholder='Name' />
                </div>
            </div>
            <div className='modal-r2 modal-input-container'>
                <div className='modal-input'>
                    <input type='text' placeholder='Phone' />
                </div>
            </div>
            <div className='modal-r3 modal-input-container'>
                <div className='modal-input'>
                    <label htmlFor='address' className='modal-input-label'>Delivery</label>
                    <input type='text' id='address' placeholder='Hostel/Address' />
                </div>
            </div>
            <div className='modal-r5 modal-button'>
                Checkout
            </div>
        </div>
    </div>
  )
}

export default Checkout
