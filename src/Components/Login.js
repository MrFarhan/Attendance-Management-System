import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux"
import firebase from 'firebase'
import { loadingAction, userDetailsAction } from '../Redux/Actions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
require('firebase/auth')



const useStyles = makeStyles((theme) => ({

    appBarCustom: {
        [theme.breakpoints.up('sm')]: {
            width: `100%`,

        },
    },
    menuButtonCustom: {
        marginRight: theme.spacing(2),
        display: 'none',

    },
    loginFormMain: {
        marginTop: "5em",
        [theme.breakpoints.up('md')]: {
            width: `40%`,
            display: "flex",
            justifyContent: "center",
            marginTop: "5em"

        },

    },
    loginForm: {
        [theme.breakpoints.up('md')]: {
            width: `140%`,

        },

    },
    toolbar: theme.mixins.toolbar,
}));

export const Login = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    var user = firebase.auth().currentUser;
    const state = useSelector((state) => state)
    const userDetails = state.userDetails
    const loadingred = state.loading

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(loadingAction(false))
            }
        });


    }, [user, dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Password must be 5 or more then 5 characters Long ')
                .max(15, 'Must be 15 characters or less')
                .required('Required')
        }),
        onSubmit: values => {
            let email = (values.email);
            let pass = (values.password);
            LoginFunc(email, pass)

        },
    });


    const LoginFunc = (email, pass) => {

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                firebase.database().ref(`Users/${firebase.auth().currentUser?.uid}/`).on("value", (res) => {
                    dispatch(userDetailsAction(res.val()))
                    history.push("/dashboard")
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error, "error");
                // [END_EXCLUDE]
            });
    }


    const SignupFunc = () => {
        history.push("/signup")
    }

    if (!loadingred && userDetails) history.push("/dashboard")


    const classes = useStyles();

    return (
        <div className={classes.loginFormMain} >
            <AppBar position="fixed" className={classes.appBarCustom} >
                <Toolbar>

                    <Typography variant="h6" noWrap>
                        Attendance Management System &nbsp;&nbsp;&nbsp;</Typography>
                </Toolbar>
            </AppBar>


            <Form onSubmit={formik.handleSubmit} className={classes.loginForm}  >
                <Form.Group >
                    <Form.Label className="labels" htmlFor="email">Email</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} autoFocus />
                    <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}</span>
                </Form.Group>


                <Form.Group >
                    <Form.Label className="labels">Password</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                    <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}</span>
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit" >  Login<FiLogIn /></Button>
                <Button variant="link" onClick={SignupFunc}>Don't have an account ?</Button>
            </Form>
        </div>
    );
};