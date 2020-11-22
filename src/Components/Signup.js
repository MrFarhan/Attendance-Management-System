import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'



export const Signup = () => {

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
            // acceptedTerms: Yup.boolean()
            //     .required('Required')
            //     .oneOf([true], 'You must accept the terms and conditions.'),
            // gender: Yup.boolean()
            //     .required('Required')
            //     .oneOf(["Male", "Female"], 'Please select your gender'),


        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    let history = useHistory()

    const LoginFunc = () => {
        history.push("/")
    }


    const SignupFunc = () => {
        history.push("/signup")
    }

    return (
        <Form onSubmit={formik.handleSubmit} className="loginform">

            <Form.Group controlId="formBasicEmail">
                <Form.Label className="labels" htmlFor="firstName">First Name</Form.Label>
                <Form.Control className="inputs" id="firstName" type="text" placeholder="Enter email" {...formik.getFieldProps('firstName')} autoFocus />
                <span className="inputerror">  {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}</span>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label className="labels" htmlFor="lastName">Last Name</Form.Label>
                <Form.Control className="inputs" id="lastName" type="text" placeholder="Enter email" {...formik.getFieldProps('lastName')} />
                <span className="inputerror">  {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}</span>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
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

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="labels">Password</Form.Label>
                <Form.Control className="inputs" id="password" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
                <span className="inputerror">{formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}</span>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="labels">Confirm Password</Form.Label>
                <Form.Control className="inputs" id="confirmPassword" type="password" placeholder="confirm Password" {...formik.getFieldProps('confirmPassword')} />
                <span className="inputerror">{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                ) : null}</span>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="inputcheckbox"   >
                <Form.Check type="checkbox" label="I hereby agree all terms of services " {...formik.getFieldProps('acceptedTerms')} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={SignupFunc} > Sign up</Button>
            <Button variant="link" onClick={LoginFunc}>Already have an account</Button>


        </Form>
    );
};