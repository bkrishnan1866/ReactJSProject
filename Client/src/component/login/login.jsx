import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'; 

export default function Login() {
    const { userDetails } = useContext(UserContext);
    
    return (
        <div>
            Inside Login Page
        </div>
    )
}
