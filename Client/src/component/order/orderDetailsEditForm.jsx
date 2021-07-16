import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { weaverGetActiveAPI } from '../weaver/weaverAPI';
import { sareeGetActiveAPI } from '../sareetype/sareeAPI';
import { getStatusListAPI, orderUpdate, getOrderDetailsById } from './orderDetailsAPI';
import 'date-fns';
import { format, compareAsc } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { UserContext } from '../../context/UserContext';
import { useParams } from "react-router-dom";

const labels = {
  0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+', 2.5: 'Ok',
  3: 'Ok+', 3.5: 'Good', 4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

function OrderDetailsEditForm() {
  const { register, handleSubmit } = useForm();
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  const { userDetails } = useContext(UserContext);
  let params = useParams();

  const [orderData, setOrderData] = useState({
                                        id_order: 0,
                                        s_customer_name: '',
                                        s_customer_city: '',
                                        s_customer_country: '',
                                        b_customer_vip: 'N',
                                        b_paid: '',
                                        id_weaver: '',
                                        id_saree_type: '',
                                        d_weaver_price: 0,
                                        d_retail_price: 0,
                                        d_other_cost: 0,
                                        d_revenue: 0,
                                        id_status_id: '',
                                        t_ordered_date: null,
                                        t_cancelled_date: null,
                                        s_cancel_reason: '',
                                        b_feedback: '',
                                        s_comment: '',
                                        s_image_url: '',
                                        s_updated_by: userDetails.userName
                                      });

  const handleOrderedDateChange = (date) => {
    const newDate = format(new Date(date), "yyyy-MM-dd");
    setOrderData((prevData) => {
      return {
        ...prevData, t_ordered_date: newDate
      }
    });
  };

  const handleCancelledDateChange = (date) => {
    const newDate = format(new Date(date), "yyyy-MM-dd");
    setOrderData((prevData) => {
      return {
        ...prevData, t_cancelled_date: newDate
      }
    });
  };

  const [weaverList, setWeaverList] = useState([{ id_weaver: '', s_weaver_name: '' }]);
  const [sareeList, setSareeList] = useState([{ id_saree_type: '', s_saree_type_description: '' }]);
  const [statusList, setStatusList] = useState([]);

  const onSubmit = async (data, e) => {
    const resp = await orderUpdate(orderData);
    alert(resp.Message);
  }

  const getActivetWeaverDataAPI = async () => {
    let weaverData = await weaverGetActiveAPI();
    setWeaverList(weaverData.weaverList);
  }

  const getActivetSareeDataAPI = async () => {
    let sareeData = await sareeGetActiveAPI();
    setSareeList(sareeData.sareeList);
  }

  const getStatusListDataAPI = async () => {
    let statusData = await getStatusListAPI();
    setStatusList(statusData.statuslist);
  }

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setOrderData((prevState) => {
      return {
        ...prevState, [name]: value
      }
    });
  }

  const onSelect = (event) => {
    const { name, value } = event.target;
    setOrderData((prevState) => {
      return {
        ...prevState, [name]: value
      }
    });
  }

  useEffect(() => {
    getActivetWeaverDataAPI();
    getActivetSareeDataAPI();
    getStatusListDataAPI();
  }, []);

  useEffect(() => {      
    const getOrderDeailsFromAPIById = async (orderId) => {
        let orderDetails = await getOrderDetailsById(orderId);
        setOrderData(orderDetails.order[0]);
        setOrderData((prevData) => {
          return {
            ...prevData, s_updated_by: userDetails.userName
          }
        });
    }
    getOrderDeailsFromAPIById(params.id);
}, [params]);  

  return (
    <div>
      Inside Add New order Form
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Customer Name : </label>
        <input type="text"
          placeholder="Customer Name"
          name="s_customer_name"
          defaultValue={orderData.s_customer_name || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>Customer City : </label>
        <input type="text"
          placeholder="Customer City"
          name="s_customer_city"
          defaultValue={orderData.s_customer_city || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>Customer Country : </label>
        <input type="text"
          placeholder="Customer Country"
          name="s_customer_country"
          defaultValue={orderData.s_customer_country || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>VIP : </label>
          Yes
          <input
          value="Y"
          name="b_customer_vip"
          type="radio"
          checked={orderData.b_customer_vip === 'Y'}
          onChange={onChangeHandle}
        />
          No
          <input
          value="N"
          name="b_customer_vip"
          type="radio"
          checked={orderData.b_customer_vip === 'N'}
          onChange={onChangeHandle}
        />
        <br></br>
        <label>Paid : </label>
          Yes
          <input
          value="Y"
          name="b_paid"
          type="radio"
          checked={orderData.b_paid === 'Y'}
          onChange={onChangeHandle}
        />
          No
          <input
          value="N"
          name="b_paid"
          type="radio"
          checked={orderData.b_paid === 'N'}
          onChange={onChangeHandle}
        />
        <br></br>
        <label>Weaver Name : </label>
        <select name="id_weaver" ref={register} 
          value={orderData.id_weaver || ''}
          onChange={onSelect}>
          <option value="0" key="0"> SELECT Weaver </option>
          {
            weaverList.map((item, index) => {
              return (<option key={item.id_weaver + index} value={item.id_weaver}>
                {item.s_weaver_name}
              </option>);
            })
          }
        </select>

        <br></br>
        <label>Saree Type : </label>
        <select name="id_saree_type" ref={register} 
          value={orderData.id_saree_type || ''}
          onChange={onSelect}>
          <option value="0" key="0"> SELECT Saree </option>
          {
            sareeList.map((item, index) => {
              return (<option key={item.id_saree_type + index} value={item.id_saree_type}>
                {item.s_saree_type_description}
              </option>);
            })
          }
        </select>
        <br></br>
        <label>Weaver Price : </label>
        <input type="text"
          placeholder="Weaver Price"
          name="d_weaver_price"
          defaultValue={orderData.d_weaver_price || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>Retail Price : </label>
        <input type="text"
          placeholder="Retail Price"
          name="d_retail_price"
          defaultValue={orderData.d_retail_price || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>Other Cost : </label>
        <input type="text"
          placeholder="Other Cost"
          name="d_other_cost"
          defaultValue={orderData.d_other_cost || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>

        <label>Status : </label>
        <select name="id_status_id" ref={register} 
          value={orderData.id_status_id || ''}
          onChange={onSelect}>
          <option value="0" key="0"> SELECT Status </option>
          {
            statusList.map((item, index) => {
              return (<option key={item.id_status_id + index} value={item.id_status_id}>
                {item.s_status_description}
              </option>);
            })
          }
        </select>
        <br></br>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Ordered Date"
            format="MM/dd/yyyy"
            value={orderData.t_ordered_date}
            onChange={handleOrderedDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Cancelled Date"
            format="MM/dd/yyyy"
            value={orderData.t_cancelled_date}
            onChange={handleCancelledDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>


        <br></br>
        <label>Cancel Reason : </label>
        <input type="text"
          placeholder="Cancel Reason"
          name="s_cancel_reason"
          defaultValue={orderData.s_cancel_reason || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <div>
          <label>Feedback : </label>
          <Rating
            name="hover-feedback"
            value={orderData.b_feedback || 0}
            precision={0.5}
            onChange={(event, newValue) => {
              setOrderData((prevState) => {
                return {
                  ...prevState, b_feedback: newValue
                }
              });
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          /> {orderData.b_feedback !== null && <Box ml={2}>
            {labels[hover !== -1 ? hover : orderData.b_feedback]}</Box>
          }
        </div>
        <br></br>
        <label>Comment : </label>
        <textarea
          placeholder="Comments"
          name="s_comment"
          defaultValue={orderData.s_comment || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <label>Image URL : </label>
        <input type="text"
          placeholder="Image URL"
          name="s_image_url"
          defaultValue={orderData.s_image_url || ''}
          onChange={onChangeHandle}
          ref={register}
        />
        <br></br>
        <input type="Submit" name="Order" value="Update Order"/>
      </form>
    </div>
  )
}

export default OrderDetailsEditForm
