import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { weaverGetByIdAPI, weaverUpdate } from './weaverAPI';
import { UserContext } from '../../context/UserContext';


export default function WeaverEditForm() {
    const { register, handleSubmit } = useForm();
    let params = useParams();
    const { userDetails } = useContext(UserContext);

    let [ weaverData, setWeaverData ] = useState({
                                            id_weaver: '',
                                            s_weaver_name: '',
                                            s_weaver_location: '',
                                            s_updated_by: ''
                                        });    

    useEffect(() => {      
        const geAlltWeaverDataAPIById = async (weaverId) => {
            let weaverDataFromAPI = await weaverGetByIdAPI(weaverId);
            setWeaverData({
                id_weaver: weaverDataFromAPI.weaverData[0].id_weaver,
                s_weaver_name: weaverDataFromAPI.weaverData[0].s_weaver_name,
                s_weaver_location: weaverDataFromAPI.weaverData[0].s_weaver_location,
                s_updated_by: userDetails.userName
            });
        }
        geAlltWeaverDataAPIById(params.id);
    }, [params]);

    function updateChange(event) {
        const { name, value } = event.target;
        setWeaverData((prevWeaverData) => {
          return {
            ...prevWeaverData,
            [name]: value
          };
        });
    }

    const onSubmit = async (data, e) => {

        setWeaverData(weaverData);
        const resp = await weaverUpdate(weaverData);
        alert(resp.Message);
    }

    return ( 
        <div>
            Inside Weaver Form  :
            <br></br>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" 
                        placeholder="Weaver Name" 
                        name="s_weaver_name" 
                        onChange={updateChange}
                        defaultValue={weaverData.s_weaver_name || ''}
                        ref={register}
                /> 
                <input type="text" 
                        placeholder="Weaver Location" 
                        name="s_weaver_location"
                        onChange={updateChange}
                        defaultValue={weaverData.s_weaver_location || ''}
                        ref={register}
                />    
                <input type="Submit" name="Weaver" />
            </form>
        </div>
    );
}