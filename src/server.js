const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./router')
const dotenv = require('dotenv')
dotenv.config()

console.log('This server is running in', process.env.NODE_ENV ?? 'production', 'mode')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.set('view engine', 'ejs')
app.set('view options', { root: path.join(__dirname, 'views') })
app.set('views', path.join(__dirname, 'views'))

app.use(router)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT ?? 3000)
console.log(`Server is running on port ${process.env.PORT ?? 3000}`)