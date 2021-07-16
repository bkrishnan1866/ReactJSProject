export const weaverGetActiveAPI = async () => {
    console.log('Inside Weaver Get All API');
    let response = await fetch(`http://localhost:1866/api/weaver`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const weaverData = await response.json(); 
    return weaverData;
}

export const weaverGetInActiveAPI = async () => {
    console.log('Inside Weaver Get All API');
    let response = await fetch(`http://localhost:1866/api/weaver/inactive`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const weaverData = await response.json(); 
    return weaverData;
}

export const weaverGetByIdAPI = async (weaverId) => {
    console.log('Inside Weaver Get All API: ' + weaverId);
    let response = await fetch(`http://localhost:1866/api/weaver/` + weaverId, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });
    const weaverData = await response.json(); 
    return weaverData;
}

export const weaverUpdate = async (newData) => {
    console.log('Inside Weaver API - ');
    let response = await fetch(`http://localhost:1866/api/weaver/`, {
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

export const weaverUpdateActivate = async (newData) => {
    console.log('Inside Weaver API - ');
    let response = await fetch(`http://localhost:1866/api/weaver/activate`, {
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

export const weaverUpdateDeactivate = async (newData) => {
    console.log('Inside Weaver API - ');
    let response = await fetch(`http://localhost:1866/api/weaver/deactivate`, {
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

export const weaverAdd = async (newData) => {
    let response = await fetch(`http://localhost:1866/api/weaver/`, {
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

