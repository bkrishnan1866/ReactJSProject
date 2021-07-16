import React, { useState, useContext } from 'react';
import { sareeAdd } from './sareeAPI';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';

export default function WeaverAddForm() {
    const { register, handleSubmit } = useForm();
    const { userDetails } = useContext(UserContext);
    let [ sareeData, setWeaverData ] = useState({
                                            s_saree_type_description: '',
                                            s_created_by: userDetails.userName,
                                            s_updated_by: userDetails.userName
                                        });    

    function updateChange(event) {
        const { name, value } = event.target;
        setWeaverData((prevSareeData) => {
          return {
            ...prevSareeData,
            [name]: value
          };
        });
    }

    const onSubmit = async (data, e) => {
        const resp = await sareeAdd(sareeData);
        alert(resp.Message);
    }

    return ( 
        <div>
            Inside Add Saree Form  :
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