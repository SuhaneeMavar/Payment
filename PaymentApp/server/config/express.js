const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

// app.use(express.static(path.join(__dirname,'../../dist/poetry')))

app.use(express.urlencoded({ extended: false }))
module.exports = app