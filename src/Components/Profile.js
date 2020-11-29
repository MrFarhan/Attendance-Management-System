import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MainAppbar } from './Appbar/MainAppbar'
import "../App.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import firebase from "firebase"
import pic from "./Circle-icons-profile.svg"
import { useDispatch } from "react-redux"
import { userDetailsAction } from '../Redux/Actions'


export const Profile = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)
    let history = useHistory()
    let dispatch = useDispatch()
    console.log(userDetails, "userdetails in profile")

    const formik = useFormik({
        initialValues: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            cNumber: userDetails.cNumber,
            password: userDetails.password,
            gender: userDetails.gender,
            dateofBirth: userDetails.dateofBirth

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
            gender: Yup.mixed()
                .required('Required')
                .oneOf(['Male', 'Female'], "please select your gender"),
            cNumber: Yup.number()

        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            UpdateFunc(values)
        },
    });

    const UpdateFunc = (values) => {

        let UID = firebase.auth().currentUser?.uid
        firebase.database().ref("Users/" + UID).update({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            cNumber: values.cNumber,
            gender: values.gender,
            dateofBirth: values.dateofBirth,
            isVerified: false
        }).then(dispatch(userDetailsAction({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            cNumber: values.cNumber,
            gender: values.gender,
            dateofBirth: values.dateofBirth,
            isVerified: false
        })).then((values)=>console.log(values, "values in profile"))
        ).catch((e) => console.log(e, "error"))

        history.push("/")

    }

    if (!loading && !userDetails) return <Redirect to="/" />

    console.log(userDetails, "userDetails in profile")
    console.log(userDetails.gender, "userdetails gender")
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
                            <Form.File.Input onClick={(e) => console.log(e.target.files[0])} />
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


                    <Form.Group>
                        <Form.Label className="labels" htmlFor="cNumber">Phone Number</Form.Label>
                        <Form.Control className="inputs" id="cNumber" type="number" placeholder="Enter your mobile number" {...formik.getFieldProps('cNumber')} />
                        <span className="inputerror">  {formik.touched.cNumber && formik.errors.cNumber ? (
                            <div>{formik.errors.cNumber}</div>
                        ) : null}</span>
                    </Form.Group>

                    <Form.Group {...formik.getFieldProps('dateofBirth')}>
                        <Form.Label className="labels" htmlFor="dateofBirth">Select your date of birth</Form.Label>
                        <Form.Control className="inputs" id="dateofBirth" type="date" placeholder="Select your date of birth" />
                        <span className="inputerror">  {formik.touched.dateofBirth && formik.errors.dateofBirth ? (
                            <div>{formik.errors.dateofBirth}</div>
                        ) : null}</span>
                    </Form.Group>


                    <Form.Group  {...formik.getFieldProps('gender')} className="inputcheckbox">
                        <Form.Label className="radiobtngroup">
                            Gender
                </Form.Label>
                        <div className="radiosubsec" >
                            <Form.Check className="radiobtn"
                                type="radio"
                                label="Male"
                                name="gender"
                                id="Male"
                                value="Male"
                            />
                            <Form.Check className="radiobtn"
                                type="radio"
                                label="Female"
                                name="gender"
                                id="Female"
                                value="Female"
                            />
                        </div>
                        <div className="inputerror">  {formik.touched.gender && formik.errors.gender ? (
                            <div>{formik.errors.gender}</div>
                        ) : null}</div>
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


                    <Button variant="primary" type="submit" > Update</Button>
                </Form>

            </div >
        </div >
    )
}
