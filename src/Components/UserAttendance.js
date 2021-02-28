import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"
import Layout from './Layout';

// var currentYear = new Date().getFullYear()

export const UserAttendance = () => {

    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    const [uuid, setUuid] = useState(state?.userDetails?.role === "Admin" ? "" : state?.userDetails?.uid)
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    const [year, setYear] = useState()
    const [month, setMonth] = useState(1)
    console.log("month is ", month)

    // const [currentPage, setCurrentPage] = useState(1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // var today = new Date().toLocaleString().split(",")[0];
    const Generate = () => {
        if (uuid && year && month) {
            const data = Object.entries(state?.allUsersAttendanceDetails)
            // eslint-disable-next-line
            const currentUuid = data.find((item, index) => item[0] === uuid)
            const yearObj = currentUuid && currentUuid[1] ? Object.entries(currentUuid[1]).find((item1, index1) => item1[0] === year) : null
            const monthObj = yearObj ? Object.entries(yearObj[1]).find((item2, index2) => item2[0] === month) : null
            if (monthObj && monthObj[1]) setAttendance(monthObj[1])
            else setAttendance({})
        }
        // eslint-disable-next-line
        Object.entries(allUserValues).map(([index, value]) => {
            if (value?.uid === uuid) setUserName(value?.firstName)
        })
    }


    useEffect(() => {
        console.log("uuid is ", uuid)
        setAttendance(false)
    }, [year, uuid, month])
    return (
        <Layout>
            {state.userDetails.role === "Admin" || (state.userDetails.role === "Authorized" && state.userDetails.isVerified) ?
                <div>
                    <div>
                        <h3> User Attendance Here</h3>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <span style={{ padding: "1em" }}>
                                <select style={{ padding: "0.5em" }} onChange={e => setUuid(e?.target?.value)} required={true}>
                                    {state.userDetails.role === "Admin" ? <>
                                        <option disabled={true} value={""}>User</option>
                                        {allUserValues?.map((item) => {
                                            return <option value={item?.uid} >{item?.firstName}</option>
                                        })}</> : <option value={state.userDetails?.uid} >{state.userDetails?.firstName}</option>
                                    }
                                </select>
                            </span>

                            <span style={{ padding: "1em" }}>
                                <select required={true} style={{ padding: "0.5em" }} onChange={e => setMonth(e.target.value)
                                }>
                                    <option value="">Month</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </span>

                            <span style={{ padding: "1em" }}>
                                <select required={true} style={{ padding: "0.5em" }} onChange={e => setYear(e.target.value)
                                }>
                                    <option value="">Year</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                </select>
                            </span>
                            <Button variant="info" type="submit" onClick={Generate}>Generate</Button>
                        </Form>
                    </div>
                    <br />

                    {!!attendance && <div >
                        <Table striped bordered hover>
                            <thead>
                                <th colSpan="6" >Attendance of {userName}  - for the month of {months[month - 1]}</th>
                                <tr>
                                    <th>Date</th>
                                    <th>Checkin</th>
                                    <th>Checkout</th>
                                    <th>Total time utilized</th>
                                    <th>Total time required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(attendance)?.length ? Object.entries(attendance)?.map((item, index) => {
                                    console.log("final retrival of item is ", item)
                                    return <tr key={index}>
                                        <td>{item[1] ? moment(item[0]).format('DD-MM-YYYY') : null}</td>
                                        <td>{item[1] ? moment(item[1]["checkedin"]).format('hh:mm:ss A') : null}</td>
                                        <td>{item[1] ? moment(item[1]["checkedout"]).format('hh:mm:ss A') : null}</td>
                                        <td><NumberFormat value={((item[1]["checkedout"] - item[1]["checkedin"]) / (1000 * 3600 * 24)).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>
                                        <td>8 Hours</td>
                                    </tr>
                                }) : <tr>
                                        <td colSpan="6" >No data</td>
                                    </tr>}
                            </tbody>
                        </Table>
                        {console.log(attendance, "atendate")}
                    </div>}
                </div>
                : <h3>Kindly ask your administrator to authorize your account</h3>}
        </Layout>
    )
}
