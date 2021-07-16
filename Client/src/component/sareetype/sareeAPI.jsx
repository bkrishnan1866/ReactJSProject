export const sareeGetActiveAPI = async () => {
    console.log('Inside Saree Get All API');
    let response = await fetch(`http://localhost:1866/api/saree`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const sareeData = await response.json(); 
    return sareeData;
}

export const sareeGetInActiveAPI = async () => {
    console.log('Inside Saree Get All API');
    let response = await fetch(`http://localhost:1866/api/saree/inactive`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const sareeData = await response.json(); 
    return sareeData;
}

export const sareeGetByIdAPI = async (sareeId) => {
    console.log('Inside Saree Get All API: ' + sareeId);
    let response = await fetch(`http://localhost:1866/api/saree/` + sareeId, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const sareeData = await response.json(); 
    return sareeData;
}

export const sareeUpdate = async (newData) => {
    console.log('Inside Saree API - ');
    let response = await fetch(`http://localhost:1866/api/saree/`, {
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

export const sareeUpdateActivate = async (newData) => {
    console.log('Inside Saree API - ');
    let response = await fetch(`http://localhost:1866/api/saree/activate`, {
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

export const sareeUpdateDeactivate = async (newData) => {
    console.log('Inside Saree API - ');
    let response = await fetch(`http://localhost:1866/api/saree/deactivate`, {
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

export const sareeAdd = async (newData) => {
    let response = await fetch(`http://localhost:1866/api/saree/`, {
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

