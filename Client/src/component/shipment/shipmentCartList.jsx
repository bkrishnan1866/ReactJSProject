import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ShipmentCartContext } from '../../context/ShipmentCartContext';
import ShipmentCartItem from './shipmentCartItem';

function ShipmentCartList() {
    const { getCart, removeFormCart } = useContext(ShipmentCartContext);
    const [ orderIds, setOrderIds] = useState([]);
    
    useEffect(() => {
        setOrderIds(getCart());
    });

    const removeCartInSipmentCart = (orderId) => {
        console.log('Remove item from Cart ' + orderId);
        removeFormCart(orderId);
    }
    
    return (
        <div>
            <h1> Cart Item  - <Link to="/order/status/100">Order</Link></h1>
            {
                orderIds.map((item, index) => {
                    return (
                        <ShipmentCartItem orderId={item} 
                            removeCartInSipmentCart={removeCartInSipmentCart} 
                            key={item + index} />
                    )
                })
            }
        </div>
    )
}

export default ShipmentCartList
