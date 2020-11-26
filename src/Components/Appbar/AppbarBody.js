import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux';
import { loadingAction, userDetailsAction } from '../../Redux/Actions';
import { useHistory } from 'react-router-dom';
require('firebase/auth')

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function AppbarBody() {
    const state = useSelector((state) => state.userDetails)
    let history = useHistory()
    let dispatch = useDispatch()

    useEffect(() => {
        firebase.database().ref(`Users/${firebase.auth().currentUser?.uid}/`).on("value", (res) => {
            dispatch(loadingAction(false))
            dispatch(userDetailsAction(res.val()))
            history.push("/dashboard")
            console.log(res.val(), "user details in appbar body ")
        })
        // eslint-disable-next-line
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Logedin as: {state?.firstName} </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Main Body</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Sub section (if any)</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Sub section (if any)</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
