import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { sareeGetActiveAPI, sareeGetInActiveAPI } from './sareeAPI';
import { sareeUpdateActivate, sareeUpdateDeactivate } from './sareeAPI'
import { UserContext } from '../../context/UserContext';

export default function SareeType () {
    const { userDetails } = useContext(UserContext);
    const [ sareeList, setSareeList ] = useState([]);
    const [ inActiveSareeList, setinActiveSareeList ] = useState([]);
    
    const getActivetSareeDataAPI = async () => {
        let sareeData = await sareeGetActiveAPI();
        setSareeList(sareeData.sareeList);
    }

    const getInActivetSareeDataAPI = async () => {
        let sareeData = await sareeGetInActiveAPI();
        setinActiveSareeList(sareeData.sareeList);
    }

    useEffect(() => {
        getActivetSareeDataAPI();   
        getInActivetSareeDataAPI();
    }, []);

    const inActivate = async (id) => {
        let newData = { id_saree_type: id, b_active_flag: 'N', s_updated_by: userDetails.userName };
        const resp = await sareeUpdateDeactivate(newData);
        getActivetSareeDataAPI();   
        getInActivetSareeDataAPI();
    }

    const activate = async (id) => {
        let newData = { id_saree_type: id, b_active_flag: 'Y', s_updated_by: userDetails.userName };
        const resp = await sareeUpdateActivate(newData);
        getActivetSareeDataAPI();   
        getInActivetSareeDataAPI();
    }

    return (
        <div>
            <label> Active Saree List </label>
            <ul>
                {sareeList.map(item => {
                     return ( 
                     <li key={item.id_saree_type}>
                         <a href={"/saree/update/" + item.id_saree_type}  > {item.s_saree_type_description} </a>
                         <button onClick={() => inActivate(item.id_saree_type)}> Deactivate </button> 
                     </li>  );
                })
                }
            </ul> 
            <label> InActive Saree List </label>
            <ul>
                {inActiveSareeList.map(item => {
                     return ( 
                        <li key={item.id_saree_type}>
                            <a href={"/saree/update/" +  item.id_saree_type}  > {item.s_saree_type_description} </a>
                            <button onClick={() => activate(item.id_saree_type)}> Activate </button> 
                        </li>  );
                })
                }
            </ul>    
        </div>
    );
}

