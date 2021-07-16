import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { weaverGetActiveAPI } from '../weaver/weaverAPI';
import { sareeGetActiveAPI } from '../sareetype/sareeAPI';
import { getStatusListAPI, orderAdd } from './orderDetailsAPI';
import 'date-fns';
import { format, compareAsc } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { UserContext } from '../../context/UserContext';
import { Paper, Container, Grid, TextField, InputAdornment } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Fab, Button } from '@material-ui/core';
import { List, ListItem, Divider, ListItemText, Avatar, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  },
  root: {
    display: 'flex',
    '& .MuiFormControl-root' : {
      width: '80%',
      margin: theme.spacing(1) 
    }
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  appBarSpacer: theme.mixins.toolbar,

  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  liroot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

function OrderDetailsAddForm() {
  const { register, handleSubmit } = useForm();
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  const { userDetails } = useContext(UserContext);

  const [orderData, setOrderData] = useState({
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
    s_created_by: userDetails.userName,
    s_updated_by: userDetails.userName
  })

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
    const resp = await orderAdd(orderData);
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

  return (
    <div>
      <main>
        <div className={classes.appBarSpacer} />

        <Paper className={classes.pageContent}>
          <form className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
                <h1> To Do List </h1>
              </Grid>
              <Grid item xs={6}> </Grid>
            </Grid>
          </form>


        </Paper>


      </main>
    </div>
  )
}

export default OrderDetailsAddForm
