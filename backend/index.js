const express = require('express')
require('dotenv').config()
const route = require('./route/route')
const dbConnect = require('./config/database')
const fileupload = require('express-fileupload')
const cloudinary = require('./config/uploadfile')
const cors = require('cors');


const app = express()
app.use(cors());

const port = process.env.PORT

app.use(express.json())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

cloudinary.cloudinaryConnect()

app.use('/api/v1', route)

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    dbConnect()
    console.log('listening on port', port)
})