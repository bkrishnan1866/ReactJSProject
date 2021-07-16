import React, { useEffect, useState, useContext } from 'react';
import { getTodoList, getActiveProfileDetails, addTodoItem, archiveTodoItem } from './todoAPI';
import { UserContext } from '../../context/UserContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Grid, TextField, InputAdornment } from '@material-ui/core';
import { InputLabel, MenuItem, FormControl, FormHelperText, Select } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Fab } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';

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
}));

export default function TodoForm() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [todoList, setTodoList] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const { userDetails } = useContext(UserContext);
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

    const archiveTodo = async (todoId) => {
        console.log('Inside Archive ' + todoId);
        setDelTodoItem((prevState) => {
            return {
                ...prevState, id_todo_id: todoId
            }
        });
        const resp = await archiveTodoItem(delTodoItem);
        alert(resp.Message);
        getActiveToDoList();
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
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={classes.paper}>
                                <h3> To Dos </h3>
                            </Paper>
                        </Grid>

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
                                        value={todoItem.s_todo_assigned}
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

                                <button onClick={() => saveTodo()}>Save</button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h1> ToDo List </h1>
                                {
                                    todoList.map(item => {
                                        return (
                                            <li key={item.id_todo_id}>
                                                {item.s_todo_txt} - Assigned To:
                                                {item.assignedTo}
                                                <button onClick={() => archiveTodo(item.id_todo_id)}>Archive</button>
                                            </li>
                                        )
                                    })
                                }
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
                                        <AddIcon />
                                    </Fab>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
};
