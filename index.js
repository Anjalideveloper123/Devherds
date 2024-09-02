
const cors = require('cors')
const bodyparser = require('body-parser')
const express = require('express')
const mongoose = require("../server/db")
const route = require("./v1/routes/userRoutes")
const routes = require("./v1/routes/adminRoutes")
const port = 3000
const path = require("path")

//const bcrypt = require('bcrypt');

var app = express()
app.use(express.json(), bodyparser.json(), cors())
app.use("/admin", routes)
app.use("/user", route)



app.use('/static', express.static(path.join(__dirname, '../server/upload')))
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {

  console.log(`App listening on port http://localhost:${port}`)

})