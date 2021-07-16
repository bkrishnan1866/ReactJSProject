import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { isWithinInterval } from 'date-fns';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - 0px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'white',
        color: 'black'
    },
    toolbar: theme.mixins.toolbar,
    appBarShift: {
        //width: `calc(100% - ${drawerWidth}px)`,
        width: `calc(100% - 0px)`,
        //marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    typography: {
        flexGrow: 1,
        align: "center"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export default function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap className={classes.typography} > 
                        Coimbatore Collections
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/order/status/100" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"Order"}>
                            <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
                            <ListItemText primary={"Order"} />
                        </ListItem>
                    </Link>
                    <Link to="/order/status/100" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"Shipment"}>
                            <ListItemIcon> <LocalShippingIcon /> </ListItemIcon>
                            <ListItemText primary={"Shipment"} />
                        </ListItem>
                    </Link>
                    <Link to="/order/status/100" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"Hold/Canceled"}>
                            <ListItemIcon> <CancelIcon /> </ListItemIcon>
                            <ListItemText primary={"Hold/Canceled"} />
                        </ListItem>
                    </Link>
                    <Link to="/order/status/100" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"Completed"}>
                            <ListItemIcon> <CheckCircleOutlineIcon /> </ListItemIcon>
                            <ListItemText primary={"Completed"} />
                        </ListItem>
                    </Link>
                    <Link to="/todo/" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"To Do"}>
                            <ListItemIcon> <ListAltIcon /> </ListItemIcon>
                            <ListItemText primary={"To Do"} />
                        </ListItem>
                    </Link>
                    <Link to="/order/status/100" className={classes.link} onClick={handleDrawerClose}>
                        <ListItem button key={"Admin"}>
                            <ListItemIcon> <SettingsIcon /> </ListItemIcon>
                            <ListItemText primary={"Admin"} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            
        </div>
    );
}
