const mongoose = require('mongoose')
const schema = mongoose.Schema

let workmodel = new schema({
  
   workname:String,
    email:String
})



module.exports = mongoose.model('worktodo',workmodel)