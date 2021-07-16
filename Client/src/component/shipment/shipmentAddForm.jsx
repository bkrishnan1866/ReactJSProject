import React, { useState, useContext, useEffect } from 'react';
import { ShipmentCartContext } from '../../context/ShipmentCartContext';
import { UserContext } from '../../context/UserContext';
import { getNamesAndLocation, addShipment } from './shipmentAPI';
import 'date-fns';
import { format, compareAsc } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

function ShipmentAddForm() {
    const { getCart, addCart, removeFormCart } = useContext(ShipmentCartContext);
    const { userDetails } = useContext(UserContext);
    const [ shipmentSelectList, setShipmentSelectList] = useState([{name: '', location: ''}]);
    const [ shipmentDetails, setShipmentDetails ] = useState({
        s_shipment_sent_by: '',
        s_shipment_sent_to: '',
        s_shipment_loc_from: '',
        s_shipment_loc_to: '',
        s_tracking_num: '',
        t_shipment_start_date: null,
        t_expected_delivery_date: null,
        t_delivered_date: null,
        d_shipment_cost: 0,
        b_shipment_status: '',
        s_created_by: userDetails.userName,
        s_updated_by: userDetails.userName
    });
  
    const getNamesAndLocationFromPAI = async (orderIds) => {
        let nameLocList = await getNamesAndLocation(orderIds);
        setShipmentSelectList(nameLocList.shipmentList);
    }

    const onSelect = (event) => {
        const { name, value } = event.target;
        setShipmentDetails((prevState) => {
          return {
            ...prevState, [name]: value
          }
        });
    }

    const onChangeHandle = (event) => {
        const { name, value } = event.target;
        setShipmentDetails((prevState) => {
          return {
            ...prevState, [name]: value
          }
        });
    }

    const handleStartDateChange = (date, colName) => {
        const newDate = format(new Date(date), "yyyy-MM-dd");
        setShipmentDetails((prevData) => {
          return {
            ...prevData, t_shipment_start_date: newDate
          }
        });
    };

    const handleExpDelDateChange = (date, colName) => {
        const newDate = format(new Date(date), "yyyy-MM-dd");
        setShipmentDetails((prevData) => {
          return {
            ...prevData, t_expected_delivery_date: newDate
          }
        });
    };

    const handleDeliveredDateChange = (date, colName) => {
        const newDate = format(new Date(date), "yyyy-MM-dd");
        setShipmentDetails((prevData) => {
          return {
            ...prevData, t_delivered_date: newDate
          }
        });
    };

    const onSubmit = async () => {
        const resp = await addShipment(shipmentDetails, getCart());
        alert(resp.Message);
    }

    useEffect(() => {
        getNamesAndLocationFromPAI(getCart());
    }, []);

    return (
        <div>
            <label>Sent By : </label>
            <select name="s_shipment_sent_by" onChange={onSelect}>
            <option value="" key="0"> SELECT Name </option>
            {
                shipmentSelectList.map((item, index) => {
                return (<option key={item.name + index} value={item.name}>
                    {item.name}
                </option>);
                })
            }
            </select>
            <br />
            <label>Sent To : </label>
            <select name="s_shipment_sent_to" onChange={onSelect}>
            <option value="" key="0"> SELECT Name </option>
            {
                shipmentSelectList.map((item, index) => {
                return (<option key={item.name + index} value={item.name}>
                    {item.name}
                </option>);
                })
            }
            </select>
            <br />
            <label>Location From : </label>
            <select name="s_shipment_loc_from" onChange={onSelect}>
            <option value="" key="0"> SELECT Location </option>
            {
                shipmentSelectList.map((item, index) => {
                return (<option key={item.location + index} value={item.location}>
                    {item.location}
                </option>);
                })
            }
            </select>
            <br />
            <label>Location To : </label>
            <select name="s_shipment_loc_to" onChange={onSelect}>
            <option value="" key="0"> SELECT Location </option>
            {
                shipmentSelectList.map((item, index) => {
                return (<option key={item.location + index} value={item.location}>
                    {item.location}
                </option>);
                })
            }
            </select>
            <br /><br />
            <label>Tracking Number : </label>
            <input type="text"
                placeholder="Tracking Number"
                name="s_tracking_num"
                defaultValue={''}
                onChange={onChangeHandle}
            />
            <br></br>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Shipment Start Date"
                format="MM/dd/yyyy"
                value={shipmentDetails.t_shipment_start_date}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date'
                }}
            />
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Expected Delivery Date"
                format="MM/dd/yyyy"
                value={shipmentDetails.t_expected_delivery_date}
                onChange={handleExpDelDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date'
                }}
            />
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Delivered Date"
                format="MM/dd/yyyy"
                value={shipmentDetails.t_delivered_date}
                onChange={handleDeliveredDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date'
                }}
            />
            </MuiPickersUtilsProvider>
            <br /><br />
            <label>Shipment Cost : </label>
            <input type="text"
                placeholder="Shipment Cost"
                name="d_shipment_cost"
                defaultValue={0}
                onChange={onChangeHandle}
            />
            <br></br>
            <label>Shipment Status : </label>
            <select name="b_shipment_status" onChange={onSelect}>
                <option value="" key="0"> SELECT Status </option>
                <option value="No" key="1"> No </option>
                <option value="Yes" key="2"> Yes </option>
            </select>
            <br /><br />
            <button onClick={onSubmit}> Save Shipment</button>
        </div>
    )
}

export default ShipmentAddForm;
