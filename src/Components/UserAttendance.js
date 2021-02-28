import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"
import Layout from './Layout';
import Paginator from 'react-hooks-paginator';

// var currentYear = new Date().getFullYear()

export const UserAttendance = () => {

    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    const [uuid, setUuid] = useState(state?.userDetails?.role === "Admin" ? "" : state?.userDetails?.uid)
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    const [year, setYear] = useState()
    // var attendanceData;
    // console.log(year, "year is ")
    // const pageLimit = 31
    const [currentPage, setCurrentPage] = useState(1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // var today = new Date().toLocaleString().split(",")[0];
    const Generate = () => {
        if (uuid && year) {        // for attendance of uuid selected user
            const data = Object.entries(state?.allUsersAttendanceDetails)
            // eslint-disable-next-line
            console.log("data is : ", data)
            if (data && data[0] && data[0][1] && data[0][1][year] && data[0][0] === uuid)
                if (data[0][1][year][currentPage])
                    setAttendance(data[0][1][year][currentPage])
                else setAttendance({})
            else setAttendance({})
            // used for showing selected username in attendance report from attendance dropdown
            // eslint-disable-next-line 
            Object.entries(allUserValues).map(([index, value]) => {
                if (value?.uid === uuid)
                    return setUserName(value?.firstName)
            })
        }
        else setAttendance(false)
    }

    useEffect(() => {
        Generate()
        //eslint-disable-next-line
    }, [currentPage])

    useEffect(() => {
        console.log("uuid is ", uuid)
        setAttendance(false)
    }, [year, uuid])
    return (
        <Layout>
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
                            <th colSpan="6" >Attendance of {userName}  - for the month of {months[currentPage - 1]} </th>
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
                                return <tr key={index}>
                                    <td>{item[0] ? moment(item[0]).format('DD-MM-YYYY') : null}</td>
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
                    <Paginator
                        totalRecords={12}
                        pageLimit={1}
                        pageNeighbours={1}
                        setOffset={() => { }}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>}
            </div>

        </Layout>
    )
}
