const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
const schedule = require('node-schedule');


app.get('/', (req, res) => {

  const job = schedule.scheduleJob('22 20 6 3 *', function () {
    firebase.database().ref("Test/").set({
      absent: false

    }).then(console.log('The answer to life, the universe, and everything!')).catch((e) => console.log(e, "error"))
    console.log('The answer to life, the XXXXXXXXXX')
  })



  res.send('Hello World!')
})

app.listen(port || 3001, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})