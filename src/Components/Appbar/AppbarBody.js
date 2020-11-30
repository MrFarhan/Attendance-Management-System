import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import { useDispatch} from 'react-redux';
import { loadingAction, userDetailsAction } from '../../Redux/Actions';
import "../../App.css";
import { useHistory } from 'react-router-dom';
// import date from 'date-and-time';
import SideNav from './SideNav';

require('firebase/auth')



const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function AppbarBody() {
    let history = useHistory()
    let dispatch = useDispatch()
    // const pattern = date.compile('MMM D YYYY hh:mm:ss A');
    // let [cDate, setUdate] = useState()

    // useEffect(() => {
    //     setInterval(() => {
    //         setUdate(date.format(new Date(), pattern))
    //     }, 1000);
    //     console.log(cDate, "cDate")
    // }, [])


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
        <div className={classes.root + " mainappbarbody"} >
            {/* <span className="date-time"><b>Date: </b>{cDate}</span> */}

            <SideNav />

        </div>
    );
}
