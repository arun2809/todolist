const mongoose = require('mongoose')
const schema = mongoose.Schema

let subwork = new schema({
    subwork:String,
    workname:String,
    email:String
})

module.exports = mongoose.model('subworkmodel',subwork)