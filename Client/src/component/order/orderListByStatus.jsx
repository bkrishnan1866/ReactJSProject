import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getOrderDetailsByStatus } from './orderDetailsAPI';
import { ShipmentCartContext } from '../../context/ShipmentCartContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Paper, Container } from '@material-ui/core';

const useGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 290,
    width: 190,
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },

  appBarSpacer: theme.mixins.toolbar,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 190,
    maxHeight: 290
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function OrderListByStatus() {
  const classes = useStyles();
  const { getCart, addCart, removeFormCart } = useContext(ShipmentCartContext);
  let params = useParams();
  const [orderData, setOrderData] = useState([]);
  const [spacing, setSpacing] = React.useState(2);
  const gridClasses = useGridStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const getOrderDetailsByStatusFromAPI = async () => {
    const orderDetails = await getOrderDetailsByStatus(params.id);
    setOrderData(orderDetails.order);
  }

  const setOrderinShipmentCart = (event) => {
    const target = event.target;
    if (target.checked) {
      addCart(target.value);
    } else {
      removeFormCart(target.value);
    }
  }

  useEffect(() => {
    getOrderDetailsByStatusFromAPI();
    console.log('Inside Order List useEffect ');
    console.log(getCart());
  }, []);

  return (
    <div>
      <main>
        <div className={gridClasses.appBarSpacer} />
        <Container className={gridClasses.container} fixed>
          <Grid container className={gridClasses.root} spacing={2}>
            <Grid xs={12}>
              <Grid container justify="center" spacing={spacing}>
                {[0, 1, 2, 3, 4, 5, 6].map((value) => (
                  <Grid key={value} item item xs={6} sm={4} md={3} lg={2} xl={2}>
                    <Paper className={gridClasses.paper} >
                      <Card className={classes.root}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                              R
                            </Avatar>
                          }
                          
                          title="Shrimp and Chorizo Paella"
                        />
                        <CardMedia
                          className={classes.media}
                          image="https://material-ui.com/static/images/cards/paella.jpg"
                          title="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            Hi
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

      </main>
    </div>
  )
}

export default OrderListByStatus;
