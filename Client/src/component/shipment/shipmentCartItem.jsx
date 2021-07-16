import React, { useState, useEffect } from 'react';
import { getOrderDetailsById } from '../order/orderDetailsAPI';

const ShipmentCartItem = ( props ) => {
    console.log('Inside Shipment Cart ');
    const [ orderData, setOrderData ] = useState({});

    const getOrderDetails = async () => {
        const orderDataFromAPI = await getOrderDetailsById(props.orderId);
        setOrderData(orderDataFromAPI.order[0]);
        console.log(orderDataFromAPI.order);
    }

    useEffect(() => {
        getOrderDetails();
    }, [])

    return (
        <> 
            <div>
                Cart Item - Customer Name : { orderData.s_customer_name }, City : { orderData.s_customer_city }

            </div>
            <div>
                <button onClick={() => props.removeCartInSipmentCart(props.orderId)}> Remove </button>
            </div>
        </>
    )
}

export default ShipmentCartItem
