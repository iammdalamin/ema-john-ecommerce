import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import fakeData from './../../fakeData/index';
import { Link } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        // console.log('handlePlaceOrder')
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    const removeProduct = (productKey) => {
        // console.log('Removing product', productKey);
        const newCart = cart.filter(pd=> pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product
        });
        setCart(cartProducts);
        // console.log(cartProducts);
    }, []);
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt='/'></img>
    }
    return (
        <div>

        <div className= "twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct}></ReviewItem>
                        )
                }
                {
                    thankyou
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className= 'main-btn' onClick={handlePlaceOrder}>Place Order</button>
                    </Link>
                </Cart>
            </div>

        </div>

        </div>
    );
};

export default Review;