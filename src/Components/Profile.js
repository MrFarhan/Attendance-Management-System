import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MainAppbar } from './Appbar/MainAppbar'
import SideNav from './Appbar/SideNav'
import "../App.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import firebase from "firebase"
import pic from "./Circle-icons-profile.svg"


export const Profile = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)
    let history = useHistory()



    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            password: "",
            confirmPassword: "",
            acceptedTerms: false

        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Password must be 5 or more then 5 characters Long ')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            confirmPassword: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            dateofBirth: Yup.date(),

        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            SignupFunc(values)
        },
    });

    const SignupFunc = (values) => {

        firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then((res) => {
            let UID = firebase.auth().currentUser?.uid
            console.log(res, "signup res")
            firebase.database().ref('Users/' + UID).set({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                isVerified: false
            })
            history.push("/")

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, "error code" + errorMessage, "error message")
            // ...
        });
    }



    const LoginFunc = () => {
        history.push("/")
    }

    if (!loading && !userDetails) return <Redirect to="/" />


    return (
        <div className="profileMain">
            <div className="profileComp">
                <MainAppbar />
            </div>
            <div className="profileNav">
                {/* <SideNav /> */}


                <Form onSubmit={formik.handleSubmit} className="loginformProfile">

                    <div className="mb-3">
                        <Form.File >
                            <img src={pic} id="formcheck-api-regular" />
                            <Form.File.Input />
                        </Form.File>
                    </div>


                    <Form.Group>
                        <Form.Label className="labels" htmlFor="firstName">First Name</Form.Label>
                        <Form.Control className="inputs" id="firstName" type="text" placeholder="Enter email" {...formik.getFieldProps('firstName')} autoFocus />
                        <span className="inputerror">  {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels" htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control className="inputs" id="lastName" type="text" placeholder="Enter email" {...formik.getFieldProps('lastName')} />
                        <span className="inputerror">  {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels" htmlFor="email">Email address</Form.Label>
                        <Form.Control className="inputs" id="email" type="email" placeholder="Enter email" {...formik.getFieldProps('email')} />
                        <span className="inputerror">  {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}</span>
                    </Form.Group>


                    <Form.Group className="inputcheckbox">
                        <Form.Label className="radiobtngroup">
                            Gender
                </Form.Label>
                        <div className="radiosubsec">
                            <Form.Check className="radiobtn"
                                type="radio"
                                label="Male"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check className="radiobtn"
                                type="radio"
                                label="Female"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            /></div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels">Password</Form.Label>
                        <Form.Control className="inputs" id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                        <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="labels">Confirm Password</Form.Label>
                        <Form.Control className="inputs" id="confirmPassword" type="password" placeholder="confirm Password" {...formik.getFieldProps('confirmPassword')} />
                        <span className="inputerror">{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div>{formik.errors.confirmPassword}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox" className="inputcheckbox"   >
                        <Form.Check type="checkbox" label="I hereby agree all terms of services " {...formik.getFieldProps('acceptedTerms')} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={SignupFunc}  > Sign up</Button>
                    <Button variant="link" onClick={LoginFunc}>Already have an account</Button>
                </Form>

            </div >
        </div >
    )
}
