// const firebase = require("firebase")
// const express = require('express')
// const app = express()
// const port = process.env.PORT
// // const port = 3002
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// const schedule = require('node-schedule');
// const moment = require("moment")


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

// var currentYear = new Date().getFullYear()
// var currentMonth = new Date().getMonth();
// currentMonth = currentMonth + 1
// let today = moment(new Date()).format('M-D-yyyy')
// let todayDay = moment(today).format('dddd')

// app.get('/', (req, res) => {

//     console.log(' / API called')
//     //  working for late
//   schedule.scheduleJob('35 07 * * *', function () {
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



//   //  working for Holiday
//   schedule.scheduleJob('17 05 * * *', function () {
//     console.log('API called for Marking late')

//     firebase.database().ref("/Attendance").on("value", (res) => {
//       const attendanceObj = res.val()
//       firebase.database().ref("/Users").on("value", (res) => {
//           const usersObj = res.val();
//           const userUids = Object.keys(res.val())
//           userUids.map((uid, index) => {
//               if (!attendanceObj[uid] || (attendanceObj[uid] && !(attendanceObj[uid][currentYear][currentMonth][today]["checkedin"]) && usersObj[uid]["weekEnd"] === todayDay)) {
//                 firebase.database().ref(`/Attendance/${uid}/${currentYear}/${currentMonth}/${today}`).set("Holiday")  
//                 console.log(uid, " is on weekend", today, todayDay)
//               } else if (!attendanceObj[uid] || (attendanceObj[uid] && !(attendanceObj[uid][currentYear][currentMonth][today]["checkedin"]))) {
//                 firebase.database().ref(`/Attendance/${uid}/${currentYear}/${currentMonth}/${today}`).set("Absent")
//                 console.log(uid, " is absent")
//               } else console.log(uid, "is  present ")
//               // else firebase.database().ref(`/Attendance/${uid}/${currentYear}/${currentMonth}/${today}`).set("Absent")
//           })
//       })
//   })

//   })
//   res.send('Welcome to Computing Yard Attendance Server!')
// })




// app.listen(port || 3004, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })