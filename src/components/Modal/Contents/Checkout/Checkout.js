import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useRazorpay } from 'react-razorpay';

import { authActions } from '../../../../store/slices/authSlice';
import { cartActions } from '../../../../store/slices/cartSlice';

import './Checkout.css';
import { toast } from 'react-toastify';

function Checkout(props) {
    const dispatch = useDispatch();

    const [selectedMode, setSelectedMode] = useState('Dine-in');
    const allowedModes = ['Dine-in', 'Take-away', 'Delivery'];
    const [address, setAddress] = useState('');
    const { error, isLoading, Razorpay } = useRazorpay();
    
    const phone = useSelector(state => state.auth.phone);
    const total = useSelector(state => state.cart.totalPrice);
    const token = useSelector(state => state.auth.token);
    const cartItemsList = useSelector(state => state.cart.items);

    const [razorpayOrderId, setRazorpayOrderId] = useState(null);
    const [razorpayPaymentId, setRazorpayPaymentId] = useState(null);
    const [razorpaySignature, setRazorpaySignature] = useState(null);
    
    // Loading and error state management
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingError, setProcessingError] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const CHECKOUT_TIMEOUT = 10000; // 10 seconds timeout

    const displayPhone = phone ? phone.slice(3) : null;
    // const totalText = total ? `Total: Rs. ${total}` : 'Total: Rs. 0';
    // if mode is delivery, then add delivery charge to total and display
    const totalAmountText = selectedMode === 'Delivery' ? `Rs. ${total} + Rs.10 (Delivery)` : selectedMode === 'Take-away' ? `Rs. ${total} + Rs.10 (Packing)` : `Rs. ${total}`;
    const totalText = total ? totalAmountText : 'Rs. 0';

    const changePhone = (event) => {
        const phone = event.target.value;
        if (phone.length <= 10) {
            const displayPhone = `+91${phone}`;
            dispatch(authActions.changePhone(displayPhone));
        }
    };

    const changeAddress = (event) => {
        setAddress(event.target.value);
    };

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    // Clear timeout when component unmounts
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const getOptions = (total, orderId) => {
        return {
            key: process.env.RAZORPAY_KEY,
            amount: total * 100,
            currency: "INR",
            name: "Lohit Canteen",
            description: "Test Transaction",
            order_id: orderId,
            handler: (response) => {
                setRazorpayOrderId(response.razorpay_order_id);
                setRazorpayPaymentId(response.razorpay_payment_id);
                setRazorpaySignature(response.razorpay_signature);
                saveOrderToBackend(response);
            },
            prefill: {
                name: "John Doe",
                email: "john.doe@gmail.com",
                contact: "9999999999",
            },
            theme: {
                color: "#F37254",
            },
            modal: {
                ondismiss: function() {
                    // When Razorpay modal is dismissed, end the processing state
                    setIsProcessing(false);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        setTimeoutId(null);
                    }
                }
            }
        };
    };

    // Check if all cart items are still available
    const checkCartItemsAvailability = async () => {
        try {
            const response = await axios.get("/api/menu/");
            const menuItems = response.data;
            
            // Check if cart is empty
            if (cartItemsList.length === 0) {
                throw new Error('Cart is empty');
            }

            // Check if all items in cart are still available
            for (let i = 0; i < cartItemsList.length; i++) {
                const item = cartItemsList[i];
                const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
                if (!(menuItem?.is_available && menuItem?.is_available_now)) {
                    throw new Error(`Item ${menuItem?.item} is no longer available, please remove it from cart`);
                }
            }
            return true;
        } catch (error) {
            console.error('Error checking availability of items in cart:', error);
            toast.error(error.message || 'Some items in cart are no longer available', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            throw error;
        }
    };

    // Update user's phone number
    const updatePhoneNumber = async () => {
        try {
            if (!phone) {
                throw new Error('Please enter your phone number');
            }
            
            const response = await axios.put('/api/update-phone/', {
                phone_number: phone
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            
            if (response.status === 200) {
                console.log("Phone number saved");
                return true;
            }
            throw new Error('Failed to update phone number');
        } catch (error) {
            console.error('Error updating phone number:', error);
            throw error;
        }
    };

    // Validate address for delivery
    const validateDeliveryAddress = () => {
        if (selectedMode === 'Delivery' && !address) {
            throw new Error('Please enter your delivery address');
        }
        return true;
    };

    // Create Razorpay order
    const createRazorpayOrder = async () => {
        try {
            const response = await axios.post("/api/razorpay/create-order/", {
                amount: total,
                currency: "INR"
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            
            console.log("Razorpay order created:", response.data);
            const options = getOptions(total, response.data.data.id);
            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
            return true;
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw error;
        }
    };

    // Save order to backend after successful payment
    const saveOrderToBackend = async (paymentResponse) => {
        try {
            // call transaction api
            console.log('Payment response:', paymentResponse);
            const transaction_response = await axios.post('/api/razorpay/complete-transaction/', {
                payment_id : paymentResponse.razorpay_payment_id,
                rz_order_id : paymentResponse.razorpay_order_id,
                signature : paymentResponse.razorpay_signature,
                amount: total
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (transaction_response.status === 201 || transaction_response.status === 200) {
                const addressToSend = (selectedMode === 'Delivery') ? address : null;
                const checkout_response = await axios.post('/api/checkout/', {
                    rz_order_id: paymentResponse.razorpay_order_id,
                    items: cartItemsList.map(item => ({
                        menu_item_id: item.id,
                        quantity: item.quantity
                    })),
                    checkout_data: {
                        mode_of_eating: selectedMode?.toLowerCase(),
                        address: addressToSend?.toLowerCase(),
                    }
                }, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                if (checkout_response.status === 200 || checkout_response.status === 201) {
                    setIsProcessing(false);
                    setOrderPlaced(true);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        setTimeoutId(null);
                    }
                    
                    // Auto-redirect to orders after 2 seconds
                    setTimeout(() => {
                        dispatch(cartActions.clearCart());
                        props.openOrders();
                    }, 2000);
                    return true;
                }
            } else {
                console.error('Error saving order to backend:', transaction_response);
                setIsProcessing(false);
                setProcessingError('Order could not be placed due to some error in transaction');
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    setTimeoutId(null);
                }
                // dispatch(cartActions.clearCart());
                // props.openOrders();
                return false;
            }
        } catch (error) {
            console.error('Error saving order to backend:', error);
            setIsProcessing(false);
            setProcessingError(error.message || 'Order could not be placed due to some error');
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
            // dispatch(cartActions.clearCart());
            // props.openOrders();
            return false;
        }
    };

    // Start timeout for checkout
    const startCheckoutTimeout = () => {
        const id = setTimeout(() => {
            if (isProcessing) {
                setIsProcessing(false);
                setProcessingError('Checkout is taking too long. Please try again.');
            }
        }, CHECKOUT_TIMEOUT);
        
        setTimeoutId(id);
    };

    // Main checkout function - Chains all API calls in sequence
    const checkout = async () => {
        try {
            setIsProcessing(true);
            setProcessingError(null);
            startCheckoutTimeout();
            
            // Step 1: Check if all cart items are available
            await checkCartItemsAvailability();
            
            // Step 2: Update phone number
            await updatePhoneNumber();
            
            // Step 3: Validate delivery address if needed
            validateDeliveryAddress();
            
            // Step 4: Create Razorpay order and initiate payment
            // (Payment handler will call saveOrderToBackend on success)
            await createRazorpayOrder();
            
            
        } catch (error) {
            console.error('Checkout process failed:', error);
            setIsProcessing(false);
            setProcessingError(error.message || 'Order could not be placed due to an error');
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        }
    };

    // Reset and retry checkout
    const retryCheckout = () => {
        setProcessingError(null);
        checkout();
    };

    // Render loading screen
    const renderLoadingScreen = () => {
        return (
            <div className='checkout-loading'>
                <div className='loading-container'>
                    <div className='loading-spinner'></div>
                    <h2>Processing Your Order</h2>
                    <p>Please wait while we process your payment...</p>
                </div>
            </div>
        );
    };

    // Render error screen
    const renderErrorScreen = () => {
        return (
            <div className='checkout-error'>
                <div className='error-container'>
                    <div className='error-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2>Checkout Failed</h2>
                    <p>{processingError}</p>
                    <div className='error-actions'>
                        <button className='retry-button' onClick={retryCheckout}>Try Again</button>
                        <button className='close-button' onClick={props.closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderSuccessScreen = () => {
        return (
            <div className='checkout-success'>
                <div className='success-container'>
                    <div className='success-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Your order has been processed and is being prepared.</p>
                    <p>Redirecting to orders...</p>
                </div>
            </div>
        );
    };

    // Determine what to render
    if (orderPlaced) {
        return renderSuccessScreen();
    }
    if (isProcessing) {
        return renderLoadingScreen();
    }

    if (processingError) {
        return renderErrorScreen();
    }

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
                        <input type='phone' placeholder='Phone (10 digits)' value={displayPhone} onChange={changePhone} />
                    </div>
                </div>
                {/* r3 */}
                <div className='modal-r3 modal-input-container'>
                    <div className='modal-input modal-input-select'>
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
                        {/* <div className='modal-input input-title'>
                            <h1>Delivery Address</h1>
                        </div> */}
                        <div className='modal-input'>
                            <input type='text' placeholder='Address' value={address} onChange={changeAddress} />
                        </div>
                    </div>
                )}
                {/* r5 */}
                {/* display total amount */}
                <div className='modal-r5 modal-input-container'>
                    <div className='modal-input'>
                        <div className='modal-input'>
                            <input type='text' placeholder='Total' value={`Amount: ${totalText}`} readOnly/>
                        </div>
                    </div>
                </div>
                {/* r6 */}
                <div className='modal-r6 modal-button' onClick={checkout}>
                    Pay with Razorpay
                </div>
            </div>
        </div>
    );
}

export default Checkout;