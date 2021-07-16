import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { sareeGetByIdAPI, sareeUpdate } from './sareeAPI';
import { UserContext } from '../../context/UserContext';


export default function WeaverEditForm() {
    const { register, handleSubmit } = useForm();
    let params = useParams();
    const { userDetails } = useContext(UserContext);

    let [ sareeData, setSareeData ] = useState({
                                            id_saree_type_type: '',
                                            s_saree_type_description: '',
                                            s_updated_by: ''
                                        });    

    useEffect(() => {      
        const geAlltWeaverDataAPIById = async (sareeId) => {
            let sareeDataFromAPI = await sareeGetByIdAPI(sareeId);
            setSareeData({
                id_saree_type: sareeDataFromAPI.sareeData[0].id_saree_type,
                s_saree_type_description: sareeDataFromAPI.sareeData[0].s_saree_type_description,
                s_updated_by: userDetails.userName
            });
        }
        geAlltWeaverDataAPIById(params.id);
    }, [params]);

    function updateChange(event) {
        const { name, value } = event.target;
        setSareeData((prevSareeData) => {
          return {
            ...prevSareeData,
            [name]: value
          };
        });
    }

    const onSubmit = async (data, e) => {

        setSareeData(sareeData);
        const resp = await sareeUpdate(sareeData);
        alert(resp.Message);
    }

    return ( 
        <div>
            Edit Saree Form  :
            <br></br>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" 
                        placeholder="Saree Description" 
                        name="s_saree_type_description" 
                        onChange={updateChange}
                        defaultValue={sareeData.s_saree_type_description || ''}
                        ref={register}
                /> 
                
                <input type="Submit" name="Saree Type" />
            </form>
        </div>
    );
}