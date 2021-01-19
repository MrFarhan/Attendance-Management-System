import React from 'react'
import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"

export const UserAttendance = () => {
    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    // var NumberFormat = require('react-number-format');


    const [uuid, setUuid] = useState("")
    // console.log(allUserValues, "all user values")
    // console.log(state, "state is")
    // console.log(allUserValues, "all user values is")
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    // const [attendanceData, setAttendanceData] = useState("")



    // const dropDownDetails = (e) => {
    //     console.log(e.target.value, "e")
    //     const data = Object.entries(state?.allUsersAttendanceDetails)
    //     data.map((item) => {
    //         if (item[0] === e.target.value)
    //             return setAttendance(item)
    //     })
    // }

    const monthHandler = (e) => {
        console.log(e.target.value, "e on drop down")
    }

    const Generate = () => {
        console.log(uuid, "e")
        const data = Object.entries(state?.allUsersAttendanceDetails)
        data.map((item) => {
            if (item[0] === uuid)
                return setAttendance(item ? item[1] : null)
        })
        Object.entries(allUserValues).map(([index, value]) => {
            if (value?.uid === uuid)
                return setUserName(value?.firstName)
        })

    }
    // let temp = attendance ? attendance[1] : null


    return (
        <div>
            <div>
                <br />
                <h3> User Attendance Here</h3>
                <br />
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "50px" }}>
                        <select style={{ padding: "10px", fontSize: "20px" }} onChange={e => setUuid(e?.target?.value)}>
                            <option value="">User</option>
                            {allUserValues?.map((item) => {
                                return <option value={item?.uid} >{item?.firstName}</option>
                            })}
                        </select>
                    </div>
                    <div style={{ marginRight: "50px" }}>
                        <select style={{ padding: "10px", marginRight: "5px", fontSize: "20px" }} onChange={e => monthHandler(e)}>
                            <option value="Period">Period</option>
                            <option value="Current Month">Current Month</option>
                            <option value="Last Month">Last Month</option>
                            <option value="Past 3 Months">Past 3 Months</option>
                            <option value="Since joining">Since joining</option>
                        </select>
                    </div>
                    <Button variant="info" stle={{ height: "2.3em !important", width: "8em !important", fontSize: "20px !important" }} onClick={Generate}>Generate</Button>
                </div>
            </div>
            <div style={{ marginTop: "5em" }}>
                <Table striped bordered hover>
                    <thead>

                        <th colSpan="6" >{userName}  </th>
                        <tr>
                            <th>Date</th>
                            <th>Checkin</th>
                            <th>Checkout</th>
                            <th>Total time utilized</th>
                            <th>Total time required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance ? Object.entries(attendance)?.map(([key, value]) => {


                            // console.log(Date.parse(value?.checkedin))
                            return <tr>
                                <td>{key ? key.replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3") : null}</td>
                                <td>{value ? moment(value.checkedin).format('hh:mm:ss A') : null}</td>
                                <td>{value ? moment(value.checkedout).format('hh:mm:ss A') : null}</td>
                                {/* <td>{(((value?.checkedout) - (value?.checkedin)) / 3600).toFixed(1)}</td> */}
                                <td><NumberFormat value={(((value?.checkedout) - (value?.checkedin)) / 3600).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>

                                <td>8 Hours</td>
                            </tr>
                        }) : null}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
