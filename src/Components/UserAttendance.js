import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"
import Layout from './Layout';
require('moment-recur');


export const UserAttendance = () => {

    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    const [uuid, setUuid] = useState(state?.userDetails?.role === "Admin" ? "" : state?.userDetails?.uid)
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    const [year, setYear] = useState()
    const [month, setMonth] = useState(1)


    const [weekEnd, setWeekEnd] = useState(state?.userDetails?.weekEnd || "Sunday")
    console.log("weekEnd", weekEnd)
    let presentDays = 0
    let utilizedTime = 0

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const Generate = () => {
        if (uuid && year && month) {
            const data = Object.entries(state?.allUsersAttendanceDetails)
            // eslint-disable-next-line
            const currentUuid = data.find((item, index) => item[0] === uuid)
            const yearObj = currentUuid && currentUuid[1] ? Object.entries(currentUuid[1]).find((item1, index1) => item1[0] === year) : null
            const monthObj = yearObj ? Object.entries(yearObj[1]).find((item2, index2) => item2[0] === month) : null
            if (monthObj && monthObj[1]) {
                setAttendance(monthObj[1])

            }
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
                                        <option value={""}>User</option>
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
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
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
                                    let days = moment(item[0]).format('dddd')
                                    if (item[1]['checkedin'])
                                    presentDays = presentDays + 1
                                    if (item[1]['checkedin'] && item[1]['checkedout'] ) {
                                        let tempUtilizedTime = ((item[1]["checkedout"] - item[1]["checkedin"]) / (1000 * 3600))
                                        utilizedTime += tempUtilizedTime
                                    }

                                    return <tr key={index}>

                                        <td>{item[1] ? moment(item[0]).format('DD-MM-YYYY') : null}</td>

                                        {item[1] === "Absent" ?
                                            <td colSpan={"4"} style={{ color: "red" }}>Absent </td>
                                            : (item[1] === "Holiday" ?
                                                <td colSpan={"4"}>Holiday </td> :
                                                <>
                                                    <td>{item[1] && moment(item[1]["checkedin"]).format('hh:mm:ss A')}</td>
                                                    <td>{item[1]["checkedout"] ? moment(item[1]["checkedout"]).format('hh:mm:ss A') : 0}</td>
                                                    <td>{!!item[1]["checkedin"] && !!item[1]["checkedout"]  ?  <NumberFormat value={((item[1]["checkedout"] - item[1]["checkedin"]) / (3.6e+6)).toFixed(1)} displayType={'text'} thousandSeparator={true} /> : 0}</td>
                                                    <td>8 Hours</td>
                                                </>

                                            )}

                                    </tr>





                                }) : <tr>
                                    <td colSpan="6" >No data</td>
                                </tr>}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">Total Days Present {presentDays}</td>
                                    <td>Total Time Utilized {utilizedTime.toFixed(2)}</td>
                                    <td>Total Time required for the month 240 Hours </td>
                                </tr>
                            </tfoot>

                        </Table>
                    </div>}
                </div>
                : <h3>Kindly ask your administrator to authorize your account</h3>}
        </Layout>
    )
}
