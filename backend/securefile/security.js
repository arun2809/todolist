
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secretkey = "fnnghfhfemnbvhgjiy554534#$%^@$#"


let hashpassword = (normalpassword)=>{
    let salt =  bcrypt.genSalt(saltRounds)
    let salt1 = parseInt(salt)
    let hashkey = bcrypt.hashSync(normalpassword,salt1)
    return hashkey;
}

let comparepassword = (oldpassword,hashpassword)=>{
    return bcrypt.compareSync(oldpassword,hashpassword)
       
    

    
}



let jwtsign = (data,cb)=>
{
    try{
        let token = jwt.sign(data,secretkey)
        cb(null,token)
    }
    catch
    {
        cb(null,err)
    }

}

let jwtverify = (token,secretkey,cb)=>{
    jwt.verify(token,secretkey,(err,result)=>{
        if(err)
        {
            console.log("either token or data is wrong")
            cb(err,null)
        }
        else{
           cb(null,result)
           
        }
    })
}


let jwtsign1 = (data)=>{
    return jwt.sign(data,secretkey,{ expiresIn: '300s' })
}

let jwtverify1 = (data)=>{
    return jwt.verify(data,secretkey)
}


module.exports = {
    hashpassword:hashpassword,
    comparepassword:comparepassword,
    jwtsign:jwtsign,
    jwtverify:jwtverify,
    jwtsign1:jwtsign1,
    jwtverify1:jwtverify1
}