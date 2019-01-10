const express = require('express')
const app = new express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')






app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 
//mongodb connection

mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser:true});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))


//import usersignuplogin file

const userdetails = require('./user/signuplogin')

app.post('/register',userdetails.signup)
app.post('/login',userdetails.login)
app.post('/forget',userdetails.forget)

app.use('/userid',userdetails.verifytoken2,userdetails.username)
app.post('/todolist',userdetails.verifytoken2,userdetails.worklist)

app.use('/displaytodolist',userdetails.verifytoken2,userdetails.worklistdata)

app.post('/deletetask',userdetails.Deletetodolist)
app.get('/friendlist',userdetails.friendlist)



app.post('/reset',userdetails.verifytoken,userdetails.resetpassword)

app.post('/uploadpic',userdetails.verifytoken2,userdetails.profileimageupload)
app.get('/showpic',userdetails.verifytoken2,userdetails.profileimageshow)
app.post('/sendnotification',userdetails.verifytoken2,userdetails.sendnotification)
app.get('/fetchnotification',userdetails.verifytoken2,userdetails.fetchnotification)
app.post('/acceptedrequest',userdetails.verifytoken2,userdetails.acceptedrequest)
app.get('/acceptedfirendlist',userdetails.verifytoken2,userdetails.acceptedfriendlist)
app.get('/worklistwithfriends',userdetails.verifytoken2,userdetails.worklistwithfriends)
app.post('/rejectnotification',userdetails.rejectnotification)



app.listen(userdetails.port,()=>{
    console.log("running on "+userdetails.port)
})