import React, { useState, useEffect, useContext } from 'react';
import { weaverGetActiveAPI, weaverGetInActiveAPI } from './weaverAPI';
import { weaverUpdateActivate, weaverUpdateDeactivate } from './weaverAPI';
import { UserContext } from '../../context/UserContext';

export default function  Weaver() {
    const { userDetails } = useContext(UserContext);
    const [ weaverList, setWeaverList ] = useState([]);
    const [ inActiveweaverList, setInActiveWeaverList ] = useState([]);
    
    const getActivetWeaverDataAPI = async () => {
        let weaverData = await weaverGetActiveAPI();
        setWeaverList(weaverData.weaverList);
    }

    const getInActivetWeaverDataAPI = async () => {
        let weaverData = await weaverGetInActiveAPI();
        setInActiveWeaverList(weaverData.weaverList);
    }

    useEffect(() => {
        getActivetWeaverDataAPI();   
        getInActivetWeaverDataAPI();
    }, []);

    const inActivate = async (id) => {
        let newData = { id_weaver: id, b_active_flag: 'N', s_updated_by: userDetails.userName };
        const resp = await weaverUpdateDeactivate(newData);
        getActivetWeaverDataAPI();   
        getInActivetWeaverDataAPI();
    }

    const activate = async (id) => {
        let newData = { id_weaver: id, b_active_flag: 'Y', s_updated_by: userDetails.userName };
        const resp = await weaverUpdateActivate(newData);
        getActivetWeaverDataAPI();   
        getInActivetWeaverDataAPI();
    }

    return (
        <div>
            <label> Active Weaver List </label>
            <ul>
                {weaverList.map(item => {
                     return ( 
                     <li key={item.id_weaver}>
                         <a href={"/weaver/update/" + item.id_weaver}  > {item.s_weaver_name} </a>
                         from {item.s_weaver_location}
                         <button onClick={() => inActivate(item.id_weaver)}> Deactivate </button> 
                     </li>  );
                })
                }
            </ul> 
            <label> InActive Weaver List </label>
            <ul>
                {inActiveweaverList.map(item => {
                     return ( 
                        <li key={item.id_weaver}>
                            <a href={"/weaver/update/" +  item.id_weaver}  > {item.s_weaver_name} </a>
                            from {item.s_weaver_location} 
                            <button onClick={() => activate(item.id_weaver)}> Activate </button> 
                        </li>  );
                })
                }
            </ul>    
        </div>
    );
}