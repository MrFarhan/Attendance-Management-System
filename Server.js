const firebase = require ("firebase")
const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
const schedule = require('node-schedule');


app.get('/', (req, res) => {

  schedule.scheduleJob('20 16 6 3 *', function () {
    console.log('The answer to life, the XXXXXXXXXX')
    firebase.database().ref("Test/").set({
      absent: false

    }).then(console.log('The answer to life, the universe, and everything!')).catch((e) => console.log(e, "error"))
  })



  res.send('Hello World!')
})

app.listen(port || 3001, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})