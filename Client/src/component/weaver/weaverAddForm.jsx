import React, { useState, useContext } from 'react';
import { weaverAdd } from './weaverAPI';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';

export default function WeaverAddForm() {
    const { register, handleSubmit } = useForm();
    const { userDetails } = useContext(UserContext);
    let [ weaverData, setWeaverData ] = useState({
                                            s_weaver_name: '',
                                            s_weaver_location: '',
                                            s_created_by: userDetails.userName,
                                            s_updated_by: userDetails.userName
                                        });    

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
        const resp = await weaverAdd(weaverData);
        alert(resp.Message);
    }

    return ( 
        <div>
            Inside Add Weaver Form  :
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