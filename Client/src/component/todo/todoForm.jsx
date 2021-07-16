import React, { useEffect, useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getTodoList, getActiveProfileDetails, addTodoItem, archiveTodoItem } from './todoAPI';
import { UserContext } from '../../context/UserContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Grid, TextField, InputAdornment } from '@material-ui/core';
import { InputLabel, MenuItem, FormControl, FormHelperText, Select } from '@material-ui/core';
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
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
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
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function TodoForm() {
    const classes = useStyles();
    const [todoList, setTodoList] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const { userDetails } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [todoItem, setTodoItem] = useState({
        s_todo_txt: '',
        s_todo_assigned: '',
        s_created_by: userDetails.userName,
        s_updated_by: userDetails.userName
    });

    const [delTodoItem, setDelTodoItem] = useState({
        id_todo_id: 0,
        b_todo_status: 'Y',
        b_archive: 'Y',
        s_updated_by: userDetails.userName
    });

    const getActiveToDoList = async () => {
        const todoListTemp = await getTodoList();
        setTodoList(todoListTemp.todoList);
    }

    const getProfileDetails = async () => {
        const profileListTemp = await getActiveProfileDetails();
        setProfileList(profileListTemp.profileList);
    }

    const onChangeHandle = (event) => {
        const { name, value } = event.target;
        setTodoItem((prevState) => {
            return {
                ...prevState, [name]: value
            }
        });
    }

    const onSelect = (event) => {
        const { name, value } = event.target;
        console.log(value);
        setTodoItem((prevState) => {
            return {
                ...prevState, s_todo_assigned: value
            }
        });
    }

    const saveTodo = async () => {
        console.log(todoItem);
        const resp = await addTodoItem(todoItem);
        alert(resp.Message);
        getActiveToDoList();
    }

    const archiveTodo = (todoId) => {
        console.log('Inside Archive ' + todoId);
        setDelTodoItem((prevState) => {
            return {
                ...prevState, id_todo_id: todoId
            }
        });
    }

    useEffect(() => {
        console.log('Inside Use Effect ');
        updateArchiveState();
    }, [delTodoItem]);

    const updateArchiveState = async () => {
        console.log('Inside API Call ');
        if (delTodoItem.id_todo_id !== 0) {
            const resp = await archiveTodoItem(delTodoItem);
            alert(resp.Message);
            getActiveToDoList();
        }
    }

    useEffect(() => {
        getActiveToDoList();
        getProfileDetails();
    }, []);

    return (
        <div>
            <main>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container} fixed>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h1> To Do List </h1>
                                <List className={classes.liroot}>
                                    {
                                        todoList.map(item => {
                                            return (
                                                <>
                                                    <ListItem alignItems="flex-start" key={item.id_todo_id}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes[
                                                                (item.assignedTo.charAt(0) === 'S'? 'orange' : 'purple')]
                                                        }>
                                                                {item.assignedTo.charAt(0)}
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                <React.Fragment>
                                                                    {item.s_todo_txt}
                                                                </React.Fragment>
                                                            }
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="comments" onClick={() => archiveTodo(item.id_todo_id)}>
                                                                <DeleteIcon color="secondary" />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>                                
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            )
                                        })
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container} fixed>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                                <Toolbar>
                                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                                        <AddIcon onClick={handleClickOpen} />
                                    </Fab>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                    </Grid>
                </Container>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Add To Do
                    </DialogTitle>
                    <DialogContent dividers>
                        <Container className={classes.container} fixed>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.paper}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="To Do Item"
                                            multiline
                                            rowsMax={3}
                                            name='s_todo_txt'
                                            onChange={onChangeHandle}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.paper}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="select-assignment">Assigned TO</InputLabel>
                                            <Select
                                                labelId="select-assignment"
                                                id="id-select-assignment"
                                                defaultValue=''
                                                onChange={onSelect}
                                                autoWidth
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    profileList.map((item, index) => {
                                                        return (<MenuItem key={item.s_login_id + index} value={item.s_login_id}>
                                                            {item.s_name}
                                                        </MenuItem>);
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => saveTodo()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </div>
    )
};
