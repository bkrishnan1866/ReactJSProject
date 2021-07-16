export const getStatusListAPI = async () => {
    console.log('Inside Status All API');
    let response = await fetch(`http://localhost:1866/api/status`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const statusList = await response.json(); 
    return statusList;
}

export const getOrderDetailsById = async (orderId) => {
    console.log('Inside Order API - To get Status All API');
    let response = await fetch(`http://localhost:1866/api/order/` + orderId, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const orderDetails = await response.json(); 
    return orderDetails;
}

export const getOrderDetailsByStatus = async (statusId) => {
    console.log('Inside Order API - To get Status All API');
    let response = await fetch(`http://localhost:1866/api/order/status/` + statusId, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const orderDetails = await response.json(); 
    return orderDetails;
}

export const orderAdd = async (newData) => {
    let response = await fetch(`http://localhost:1866/api/order/`, {
        method: 'post',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        },
        body: JSON.stringify(newData)
    });

    const resp = await response.json();
    return resp;
}

export const orderUpdate = async (newData) => {
    console.log('Inside Order API - ');
    let response = await fetch(`http://localhost:1866/api/order/`, {
        method: 'put',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        },
        body: JSON.stringify(newData)
    });

    const resp = await response.json();
    return resp;
}