// const firebase = require("firebase")
// const express = require('express')
// const app = express()
// const port = process.env.PORT
// // const port = 3002
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// const schedule = require('node-schedule');

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId
// };


// firebase.initializeApp(firebaseConfig)


// app.get('/', (req, res) => {

//   //working for late
//   schedule.scheduleJob('15 0 * * 1-6', function () {
//     console.log('API called for Marking late')
//     firebase.database().ref("/Attendance").on("value", (res) => {
//       const attendanceObj = res.val()
//       firebase.database().ref("/Users").on("value", (res) => {
//         const userUids = Object.keys(res.val())
//         userUids.map((uid, index) => {
//           if (attendanceObj[uid] && (attendanceObj[uid][currentYear][currentMonth][today])) {
//             console.log(uid, " is on time")
//           } else
//             firebase.database().ref(`/Attendance/${uid}/${currentYear}/${currentMonth}/${today}`).update({
//               isLate: true
//             })
//         })
//       })
//     })
//   })

//   // working for absent
//   schedule.scheduleJob('0 5 * * 1-6', function () {
//     console.log('API called for Marking late')
//     firebase.database().ref("/Attendance").on("value", (res) => {
//       const attendanceObj = res.val()
//       firebase.database().ref("/Users").on("value", (res) => {
//         const userUids = Object.keys(res.val())
//         userUids.map((uid, index) => {
//           if (attendanceObj[uid] && (attendanceObj[uid][currentYear][currentMonth][today])) {
//             console.log(uid, " is present")
//           } else firebase.database().ref(`/Attendance/${uid}/${currentYear}/${currentMonth}/${today}`).set("Absent")
//         })
//       })
//     })
//   })
//   res.send('Welcome to Computing Yard Attendance Server!')
// })

// app.listen(port || 3004, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })