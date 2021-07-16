import React, { createContext, useState } from 'react';

export const ShipmentCartContext = createContext();

const ShipmentCartProvider = (props) => {
    const [ shipmentCart, setShipmentCart ] = useState([]);

    const getCart = () => {
        return shipmentCart;
    }

    const addCart = (orderId) => {
        const orderIdAsNum = Number(orderId);
        if(!shipmentCart.includes(orderIdAsNum))
            shipmentCart.push(orderIdAsNum);
        else
            console.log('Item already exists');
        setShipmentCart(shipmentCart);        
    }

    const removeFormCart = (orderId) => {
        const orderIdAsNum = Number(orderId);
        let cartArray = shipmentCart.filter(item => item !== orderIdAsNum);
        setShipmentCart(cartArray);
    }

    return(
        <ShipmentCartContext.Provider value={{ getCart, addCart, removeFormCart}}>
            {props.children}
        </ShipmentCartContext.Provider>
    )
}

export default ShipmentCartProvider;