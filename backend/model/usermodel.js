const mongoose = require('mongoose')
const schema = mongoose.Schema;

let userdata = new schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    mobileno:Number
})

let userImage = new schema({
    email:String,
    image:String
})


let notification = new schema({
    requestername:String,
    requesteremail:String,
    recieveremail:String
})

let friends = new schema({
    acceptedfriend:String,
    acceptor:String,
    acceptorname:String,
    friendsname:String
})



let userdatamodel = mongoose.model('todo_user',userdata)
let userimagemodel = mongoose.model('todo_image',userImage)
let notificationmodel = mongoose.model('todo_notification',notification)
let friendsmodel = mongoose.model('todo_friends',friends)




module.exports = {
    userdatamodel:userdatamodel,
    userimagemodel:userimagemodel,
    notificationmodel:notificationmodel,
    friendsmodel:friendsmodel
}