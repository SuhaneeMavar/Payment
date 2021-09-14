if(process.env.NODE_ENV!='production')
    require('dotenv').config()
const app=require('./config/express')
const express=require('express')
const config=require('./config/config')
const users=require('./routes/user.route')
const payments=require('./routes/payment.route')
const auth=require('./routes/auth.route')
const helmet=require('helmet')
const cookieParser= require('cookie-parser')
require('./config/mongoose')

//for using json format
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(helmet())
app.use(cookieParser())

//redirect to the routes
app.use('/users',users)
app.use('/payments',payments)
app.use('/auth',auth)


app.listen(config.port,()=>{
    console.log('Server is running at port:'+config.port);
})
