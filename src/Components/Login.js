import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux"
import firebase from 'firebase'
import { userDetailsAction } from '../Redux/Actions';
require('firebase/auth')


export const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    let history = useHistory()
    var user = firebase.auth().currentUser;
    // const [userDetails, setUserDetails] = useState()
    const state = useSelector((state) => state.userDetails)
    const loadingred = useSelector((val) => val.loading)



    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setLoading(true)
            }
        });


    }, [user])

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
            .then((response) => {
                console.log(response, "response from firebase at login")
                firebase.database().ref(`Users/${firebase.auth().currentUser?.uid}/`).on("value", (res) => {
                    // setUserDetails(res.val())
                    dispatch(userDetailsAction(res.val()))
                    console.log(res.val(), "user details in login")
                    history.push("/dashboard")
                    // Redirect("/dashboard")
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

    if (!loadingred && state) return <Redirect to="/dashboard" />
    return (
        <Form onSubmit={formik.handleSubmit} className="loginform">
            <Form.Group >
                <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                <Form.Control className="inputs" id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} autoFocus />
                <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}</span>
            </Form.Group>


            <Form.Group >
                <Form.Label className="labels">Password</Form.Label>
                <Form.Control className="inputs" id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}</span>
            </Form.Group>
            <Form.Group className="inputcheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" > <FiLogIn />Login</Button>
            <Button variant="link" onClick={SignupFunc}>Don't have an account</Button>


        </Form>
    );
};