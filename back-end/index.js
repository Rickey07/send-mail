const dbConnectionRequire = require('./db');
const dotenv = require('dotenv')
dotenv.config();
dbConnectionRequire();

const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require('path')


app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello How are you!')
})
app.use(express.json())
app.use('/signup',require('./Routes/auth'))
app.use(express.static('views/images'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})