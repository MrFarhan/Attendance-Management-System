import React from 'react'
import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import moment from "moment"
import Layout from './Layout';

export const UserAttendance = () => {
    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)
    const [uuid, setUuid] = useState("")
    const [userName, setUserName] = useState("")
    const [attendance, setAttendance] = useState("")
    const [period, setPeriod] = useState()

    // const Generate = () => {
    //     console.log(uuid, "e")
    //     const data = Object.entries(state?.allUsersAttendanceDetails)
    //     // eslint-disable-next-line
    //     data.map((item) => {
    //         if (item[0] === uuid && period.toString() === "Period") 
    //         return item[1]?.map((item1,index)=>{
    //             return console.log("item1 is ", item1)
    //         })
    //         // {
    //         //     return console.log(item ? item[1] : null)
    //         // } 
    //         else if (item[0] === uuid && period.toString() === "Current Month") {
    //             // return console.log("current month")
    //             return console.log(item ? item[1] : null)
    //         } else if (item[0] === uuid && period.toString() === "Last Month") {
    //             // return console.log("Last Month")
    //             return console.log(item ? item[1] : null)

    //         } else if (item[0] === uuid && period.toString() === "Since joining") {
    //             // return console.log("Since joining")
    //             return console.log(item ? item[1] : null)
    //         } else return setAttendance(item ? item[1] : null)
    //     })

    //     // eslint-disable-next-line
    //     Object.entries(allUserValues).map(([index, value]) => {
    //         if (value?.uid === uuid)
    //             return setUserName(value?.firstName)
    //     })

    // }





    const Generate = () => {
        // for attendance of uuid selected user
        const data = Object.entries(state?.allUsersAttendanceDetails)
        // eslint-disable-next-line
        data.map((item) => {
            if (item[0] === uuid)
                return setAttendance(item ? item[1] : null)
        })


        // used for showing selected username in attendance report from attendance dropdown
        // eslint-disable-next-line 
        Object.entries(allUserValues).map(([index, value]) => {
            if (value?.uid === uuid)
                return setUserName(value?.firstName)
        })

    }


    // var str = '012123';

    // console.log(str); //shows '012123'
    // console.log(strFirstThree); // shows '012'

    attendance ? Object.entries(attendance)?.map(([key, value]) => {
        // console.log("key before return: ", key)
        var month = key? key.toString() : null
        var monthNumber = month.slice(2, 4);
        console.log("month of attendance is : ", monthNumber)
        return console.log("kuch bhe")
    }) : console.log("attendance not present")

    console.log("attendance is : ", attendance)

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
                                <option value="Period">Period</option>
                                <option value="Current Month">Current Month</option>
                                <option value="Last Month">Last Month</option>
                                <option value="Past 3 Months">Past 3 Months</option>
                                <option value="Since joining">Since joining</option>
                            </select>
                        </span>
                        <Button variant="info" onClick={Generate}>Generate</Button>
                    </div>
                </div>
                <br />

                <div >
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
                                return <tr>
                                    <td>{key ? key.replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3") : null}</td>
                                    <td>{value ? moment(value.checkedin).format('hh:mm:ss A') : null}</td>
                                    <td>{value ? moment(value.checkedout).format('hh:mm:ss A') : null}</td>
                                    <td><NumberFormat value={(((value?.checkedout) - (value?.checkedin)) / 3600).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>
                                    <td>8 Hours</td>
                                </tr>
                            }) : null}
                        </tbody>
                    </Table>
                </div>
            </div>

        </Layout>
    )
}
