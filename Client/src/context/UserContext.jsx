import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [ userDetails, setUserDetails ] = useState( {
        userName : 'shindhukn',
        password: ''
    } );

    const setUer = (userDetails) => {
        setUserDetails(userDetails);
    } 

    const removeUser = () => {
        setUserDetails({})
    }

    return (
        <UserContext.Provider value={{ userDetails, setUer, removeUser} } >
            {props.children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;