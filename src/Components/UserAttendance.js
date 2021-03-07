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
    const [lastDBdate, setlastDBdate] = useState()
    // console.log(month,"month is ")
    const [lastPresentDay, setlastPresentDay] = useState()
    let temp = []
    let DBmissingDays = []

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
                // {
                //     var last = Object.keys(monthObj[1])[Object.keys(monthObj[1]).length - 1];
                //     last = moment(last).format('DD-MM-YYYY')
                //     const yesterdaydate = moment().subtract(1, "days").format("DD-MM-YYYY");
                //     console.log("yesterday is ", yesterdaydate)
                //     console.log("last present is ", last)
                //     setlastPresentDay(last)
                // }
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
                                    if (item[1]['checkedin']) {
                                        presentDays = presentDays + 1
                                        let tempUtilizedTime = ((item[1]["checkedout"] - item[1]["checkedin"]) / (1000 * 3600 * 24))
                                        utilizedTime += tempUtilizedTime
                                    }

                                    // var recurrence;
                                    // const firstDateofMonth = new moment(month + "-1-2021").startOf('month').format("MM-DD-YYYY")
                                    // const yesterdaydate = moment().subtract(1, "days").format("MM-DD-YYYY");
                                    // if (firstDateofMonth <= yesterdaydate)
                                    //     console.log("firstDateofMonth is ", firstDateofMonth, "and yesterdaydate is ", yesterdaydate)
                                    // recurrence = moment().recur(firstDateofMonth, yesterdaydate).every().days();
                                    // var allDates = recurrence.all("D-MM-YYYY");
                                    // console.log("All calender Dates from past 1 month  ", allDates)

                                    // temp.push(item[0])
                                    // console.log("dates from database ", temp)
                                    // setlastDBdate(item[0])
                                    // console.log("last date in db is ", item[0])
                                    //allDates = total calender dates
                                    //temp = dates in database
                                    // allDates.map((item1, index) => {
                                    //     let temp = [...item1]
                                    //     temp = temp.filter((value, index) => value !== item[0])

                                    //     console.log("temp", temp)


                                    // })


                                    return <tr key={index}>
                                        {/* {console.log("DB Dates are ", temp)
                                        } */}
                                        <td>{item[0] && moment(item[0]).format('dddd') === weekEnd ? "holdiday" : null}</td>
                                        {/* {console.log("dates from DB is : ", moment(item[0]).format('DD-MM-YYYY'))} */}
                                        {/* <td>{item[1] && moment(item[0]).format('dddd') === weekEnd && (item[1]["checkedin"].length >= 2) ? "Holiday" : moment(item[0]).format('DD-MM-YYYY')}</td> */}
                                        <td>{item[1] ? moment(item[0]).format('DD-MM-YYYY') : null}</td>
                                        <td>{item[1] ? moment(item[1]["checkedin"]).format('hh:mm:ss A') : "Absent"}</td>
                                        <td>{item[1] ? moment(item[1]["checkedout"]).format('hh:mm:ss A') : null}</td>
                                        <td><NumberFormat value={((item[1]["checkedout"] - item[1]["checkedin"]) / (1000 * 3600 * 24)).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>
                                        <td>8 Hours</td>
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
