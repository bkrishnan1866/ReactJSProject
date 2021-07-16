export const getShipmentDetails = async (shipmentId) => {
    console.log('Inside Shipment API ' + shipmentId);
    let response = await fetch(`http://localhost:1866/api/shipment/` + shipmentId , {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const shipmentDetails = await response.json(); 
    return shipmentDetails;
}

export const getNamesAndLocation = async (orderIds) => {
    console.log('Inside Shipment API ' + orderIds);
    let response = await fetch(`http://localhost:1866/api/shipment/order/` + orderIds , {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const nameLocList = await response.json(); 
    return nameLocList;
}

export const addShipment = async (data, orderIds) => {
    console.log('Inside Shipment API - Add ');
    let response = await fetch(`http://localhost:1866/api/shipment/` , {
        method: 'post',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        },
        body: JSON.stringify([data, orderIds])
    });
    const resp = await response.json(); 
    return resp;
}

export const updateShipment = async (data) => {
    console.log('Inside Shipment API - Add ');
    let response = await fetch(`http://localhost:1866/api/shipment/` , {
        method: 'put',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        },
        body: JSON.stringify(data)
    });
    const resp = await response.json(); 
    return resp;
}