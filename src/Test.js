// // import React from 'react'
// // import Layout from './Components/Layout'

// // const Test = () => {

// //     return (
// //         <div>
// //             <Layout >
// //                 <h1>User test cases here with Hello world</h1>
// //             </Layout>
// //         </div>
// //     )
// // }
// // export default Test;



// import React from 'react'
// import { useState } from 'react'
// import { Button, Table } from 'react-bootstrap'
// import { useSelector } from 'react-redux'
// import NumberFormat from 'react-number-format';
// import moment from "moment"
// import Layout from './Layout';

// export const UserAttendance = () => {
//     const state = useSelector(state => state)
//     const allUserDetails = state?.allUserDetails
//     const allUserValues = Object.values(allUserDetails)
//     const [uuid, setUuid] = useState("")
//     const [userName, setUserName] = useState("")
//     const [attendance, setAttendance] = useState("")
//     const [period, setPeriod] = useState()


//     // console.log("attendance is : ", attendance)
//     // console.log("period is : ", period)


//     // const monthHandler = (e) => {
//     //     // setPeriod(e.target.value)
//     //     // console.log(period, "e on drop down")
//     // }

//     const Generate = () => {
//         console.log(uuid, "e")
//         const data = Object.entries(state?.allUsersAttendanceDetails)
//         // eslint-disable-next-line
//         data.map((item) => {
//             if (item[0] === uuid && period.toString() === "Period") {
//                 return console.log(item ? item[1] : null)
//             } else if (item[0] === uuid && period.toString() === "Current Month") {
//                 // return console.log("current month")
//                 return console.log(item ? item[1] : null)
//             } else if (item[0] === uuid && period.toString() === "Last Month") {
//                 // return console.log("Last Month")
//                 return console.log(item ? item[1] : null)

//             } else if (item[0] === uuid && period.toString() === "Since joining") {
//                 // return console.log("Since joining")
//                 return console.log(item ? item[1] : null)
//             } else return setAttendance(item ? item[1] : null)
//         })

//         // eslint-disable-next-line
//         Object.entries(allUserValues).map(([index, value]) => {
//             if (value?.uid === uuid)
//                 return setUserName(value?.firstName)
//         })

//     }


//     return (
//         <Layout>

//             <div>
//                 <div>
//                     <h3> User Attendance Here</h3>
//                     <div>
//                         <span style={{ padding: "1em" }}>
//                             <select style={{ padding: "0.5em" }} onChange={e => setUuid(e?.target?.value)}>
//                                 <option value="">User</option>
//                                 {allUserValues?.map((item) => {
//                                     return <option value={item?.uid} >{item?.firstName}</option>
//                                 })}
//                             </select>
//                         </span>
//                         <span style={{ padding: "1em" }}>
//                             <select style={{ padding: "0.5em" }} onChange={e => setPeriod(e.target.value)
//                             }>
//                                 <option value="Period">Period</option>
//                                 <option value="Current Month">Current Month</option>
//                                 <option value="Last Month">Last Month</option>
//                                 <option value="Past 3 Months">Past 3 Months</option>
//                                 <option value="Since joining">Since joining</option>
//                             </select>
//                         </span>
//                         <Button variant="info" onClick={Generate}>Generate</Button>
//                     </div>
//                 </div>
//                 <br />

//                 <div >
//                     <Table striped bordered hover>
//                         <thead>
//                             <th colSpan="6" >{userName}  </th>
//                             <tr>
//                                 <th>Date</th>
//                                 <th>Checkin</th>
//                                 <th>Checkout</th>
//                                 <th>Total time utilized</th>
//                                 <th>Total time required</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {attendance ? Object.entries(attendance)?.map(([key, value]) => {
//                                 return <tr>
//                                     <td>{key ? key.replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3") : null}</td>
//                                     <td>{value ? moment(value.checkedin).format('hh:mm:ss A') : null}</td>
//                                     <td>{value ? moment(value.checkedout).format('hh:mm:ss A') : null}</td>
//                                     <td><NumberFormat value={(((value?.checkedout) - (value?.checkedin)) / 3600).toFixed(1)} displayType={'text'} thousandSeparator={true} /></td>
//                                     <td>8 Hours</td>
//                                 </tr>
//                             }) : null}
//                         </tbody>
//                     </Table>
//                 </div>
//             </div>

//         </Layout>
//     )
// }



import React from 'react'
// require('moment-recur');
import firebase from "firebase"

export const Test = () => {
    // var moment = require('moment');
    // var recurrence;

    // // console.log("1st date of month is ", new moment().startOf('month').format("DD-MM-YYYY"))
    // let firstDateofMonth =  new moment().startOf('month').format("MM-DD-YYYY")
    // const yesterdaydate = moment().subtract(1, "days").format("MM-DD-YYYY");
    // console.log("firstDateofMonth is ", firstDateofMonth, "and yesterdaydate is ", yesterdaydate )

    // recurrence = moment().recur(firstDateofMonth, yesterdaydate).every().days();
    // var allDates = recurrence.all("DD-MM-YYYY");
    // console.log("allDates", allDates)

    // // console.log(yesterdaydate)
    /* {console.log("allDates", moment().subtract(1, 'days').startOf('date').toString())} */




    // const job = schedule.scheduleJob('01 10 * * *', function () {
    //     console.log('The answer to life, the universe, and everything!');
    // });



    const schedule = require('node-schedule');
    const job = schedule.scheduleJob('13 19 6 3 *', function () {
        firebase.database().ref("Test/").set({
            absent: true

        }).then(console.log('The answer to life, the universe, and everything!')).catch((e) => console.log(e, "error"))
        console.log('The answer to life, the XXXXXXXXXX')
    });



    return (
        <div>Hello world
        </div>
    )
}