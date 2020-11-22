import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase'
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
    const [user, setuser] = useState(false)
    useEffect(()=>{
        setuser(firebase.auth().currentUser)
    },[firebase.auth()?.currentUser?.email])
    const classes = useStyles();
    console.log(firebase.auth().currentUser?.uid, "firebase auth")

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Logedin as: {user?.email} </Paper>

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
                {/* <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
            </Grid>
        </div>
    );
}
