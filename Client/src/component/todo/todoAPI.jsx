export const getTodoList = async () => {
    console.log('Inside TODO API ');
    let response = await fetch(`http://localhost:1866/api/todoList`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });

    const todoList = await response.json();
    return todoList;
}

export const addTodoItem = async (data) => {
    console.log('Inside TODO API ');
    let response = await fetch(`http://localhost:1866/api/todoList`, {
        method: 'post',
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

export const archiveTodoItem = async (data) => {
    console.log('Inside TODO API ');
    let response = await fetch(`http://localhost:1866/api/todoList`, {
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

export const getActiveProfileDetails = async () => {
    console.log('Inside TODO API ');
    let response = await fetch(`http://localhost:1866/api/profile/list`, {
        method: 'get',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',    
        }
    });

    const profileList = await response.json();
    return profileList;
}
