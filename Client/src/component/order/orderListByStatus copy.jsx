import React, {useEffect, useContext, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getOrderDetailsByStatus } from './orderDetailsAPI';
import { ShipmentCartContext } from '../../context/ShipmentCartContext';

function OrderListByStatus() {
    const { getCart, addCart, removeFormCart} = useContext(ShipmentCartContext);
    let params = useParams();
    const [ orderData, setOrderData ] = useState([]);

    const getOrderDetailsByStatusFromAPI = async () => {
        const orderDetails = await getOrderDetailsByStatus(params.id);
        setOrderData(orderDetails.order);
    }

    const setOrderinShipmentCart = (event) => {
        const target = event.target;
        if(target.checked) {
            addCart(target.value);
        }else {
            removeFormCart(target.value);
        }
    }

    useEffect(() => {
        getOrderDetailsByStatusFromAPI();
        console.log('Inside Order List useEffect ');
        console.log(getCart());
    }, []);

    return (
        <div>
            <h1>Order Items</h1>
            <ul>
                <li><Link to="/shipment/cart/">Shipment</Link></li>
                {
                    orderData.map((item, index) => {
                        const orderIds = getCart();
                        console.log(orderIds);
                        const flag = orderIds.includes(item.id_order);
                        console.log("order-"+item.id_order+ "-flag-"+flag);
                        return (
                        <li key={item.id_order}>
                            <input type="checkbox" name="order_checkbox" value={item.id_order} 
                                defaultChecked={flag}
                                onChange={setOrderinShipmentCart} />
                            - Customer Name: {item.s_customer_name}, City: {item.s_customer_city}
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default OrderListByStatus;
