import React from 'react'
import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"
import Layout from './Layout';
import Paginator from 'react-hooks-paginator';
import { useEffect } from 'react';


export const UserAttendance = () => {

    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    const [uuid, setUuid] = useState("")
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    const [period, setPeriod] = useState()

    const pageLimit = 30;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    // const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);


    // useEffect(() => {
    //     fetchData().then(data => setData(data));
    // }, []);

    useEffect(() => {
        setCurrentData(attendance.slice(offset, offset + pageLimit));
    }, [offset, attendance]);



    var today = new Date().toISOString().split("T")[0]
    var test = "";
    const Generate = () => {
        // for attendance of uuid selected user
        const data = Object.entries(state?.allUsersAttendanceDetails)
        // eslint-disable-next-line
        data.map((item) => {
            if (item[0] === uuid)
            return setAttendance(item ? item[1] : null), setCurrentData(attendance.slice(1, 2)), console.log("attendance slice ",attendance.slice(1, 2) )
        })



        // used for showing selected username in attendance report from attendance dropdown
        // eslint-disable-next-line 
        Object.entries(allUserValues).map(([index, value]) => {
            if (value?.uid === uuid)
                return setUserName(value?.firstName)
        })

    }


    attendance ? Object.entries(attendance)?.map(([key, value]) => {
        var month = key ? key.toString() : null
        var monthNumber = month.slice(2, 4);
        return console.log("kuch bhe")
    }) : console.log("attendance not present")


    return (
        <Layout>

            <div>
                <div>
                    <h3> User Attendance Here</h3>
                    <div>
                        <span style={{ padding: "1em" }}>
                            <select style={{ padding: "0.5em" }} onChange={e => setUuid(e?.target?.value)}>
                                <option value="">User</option>
                                {allUserValues?.map((item) => {
                                    return <option value={item?.uid} >{item?.firstName}</option>
                                })}
                            </select>
                        </span>


                        <span style={{ padding: "1em" }}>
                            <select style={{ padding: "0.5em" }} onChange={e => setPeriod(e.target.value)
                            }>
                                <option value="Period">Year</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                            </select>
                        </span>
                        <Button variant="info" onClick={Generate}>Generate</Button>
                    </div>
                </div>
                <br />

                <div >
                    <Table striped bordered hover>
                        <thead>
                            <th colSpan="6" >Attendance of {userName}  - for the month of   </th>
                            <tr>
                                <th>Date</th>
                                <th>Checkin</th>
                                <th>Checkout</th>
                                <th>Total time utilized</th>
                                <th>Total time required</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                attendance ? Object.entries(Object.entries(attendance)[0][1]).map((item, index) => {
                                    console.log("attendance is : ", item)
                                    return <tr key={index}>
                                        <td>{item[0]}</td>
                                        <td>{item[1] ? moment(item[1]["checkedin"]).format('hh:mm:ss A') : null}</td>
                                        <td>{item[1] ? moment(item[1]["checkedout"]).format('hh:mm:ss A') : null}</td>
                                        <td><NumberFormat value={((item[1]["checkedout"] - item[1]["checkedin"]) / 3600).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>
                                        <td>8 Hours</td>
                                    </tr>
                                }) : null

                            }

                    <Paginator
                        totalRecords={2}
                        pageLimit={2}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                        </tbody>
                    </Table>
                </div>
            </div>

        </Layout>
    )
}
