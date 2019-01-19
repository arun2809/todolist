
const usermodel = require('../model/usermodel')
const workmodel = require('../model/workmodel')
const secure_js = require('../securefile/security')
const nodemailer = require('nodemailer')
const secretkey = "fnnghfhfemnbvhgjiy554534#$%^@$#"
const path = require('path')
const port = 4600;


let signup = (req,res)=>{
    if(req.body.email)
    {
        if(req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            usermodel.userdatamodel.findOne({"email":req.body.email},(err,result)=>{
                if(err)
                {
                    res.json(err)
                }
                else if(result)
                {
                    
                    res.status(404).send("email already registerd")
                }
                else{
                    new usermodel.userdatamodel({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        email:req.body.email,
                        password: secure_js.hashpassword(req.body.password),
                        mobileno:req.body.mobileno
                    }).save((err,result)=>{
                        if(err)
                        {
                            res.status(411).send("mobile number should be numeric")
                        }
                        else {
                           // res.json(result)
                           var smtptransport = nodemailer.createTransport({
                            service:'Gmail',
                            auth:{
                                user:'todonoreplyonit@gmail.com',
                                pass:'password@12'
                            }
                        })
                
                        var mailoptions = {
                            to:result.email,
                            from:'todonoreplyonit@gmail.com',
                            subject:"Registration Successfull",
                            text:"hi " +result.firstname + " "+ result.lastname+ " " + "you  are Successfully Registered" 
                            
                        }
                
                        smtptransport.sendMail(mailoptions,(err)=>{
                            if(err)
                            {
                               res.json(err)
                            }
                            else{
                                res.json("Registration successfull")
                            }
                        })
                
                
                        }
                    })
                
                }
            })
        }
        else{
            res.status(409).send("email format is wrong")
        }
    }
        else{
             res.json("enter email")
        }
    }
              






                    
                
        
            
        
    
    
    
        




let login = (req,res)=>{
    if(req.body.email && req.body.password)
    {
        if(req.body.email)
        {
            usermodel.userdatamodel.findOne({"email":req.body.email},(err,result)=>{
                if(err)
                {
                    res.json(err)
                }
                else if(!result)
                {
                    res.status(409).send("email is not registered")
                }
                else if(result)
                {
                    if(secure_js.comparepassword(req.body.password,result.password))
                    {
                        secure_js.jwtsign({email:result.email,firstname:result.firstname,lastname:result.lastname},(err,token)=>{
                            if(err)
                            {
                                res.json(err)
                            }
                            else{
                                res.json(token)
                            }
                        })
                    
                    }
                    else{
                        res.status(411).send("password not match")
                    }
                }
            })
        }
    }
    else{
        res.json("enter email and password both")
    }
}



let forget = (req,res)=>{

    usermodel.userdatamodel.findOne({"email":req.body.email},(err,result)=>{
        if(err)
        {
            res.status(404).send("enter valid email")
        }
        else if(!result)
        {
            res.status(409).send("this email is not registered")
        }
        else if(result)
        {

            let token = secure_js.jwtsign1({email:result.email})
            var smtptransport = nodemailer.createTransport({
                service:'Gmail',
                auth:{
                    user:'todonoreplyonit@gmail.com',
                    pass:''
                }
            })
            let url = "http://localhost:4200/reset/?token="+token
            var mailoptions = {
              
                to:result.email,
                from:'todonoreplyonit@gmail.com',
                subject:"node.js password reset",
                text:"hi " +result.firstname + " " + result.lastname+ " " +"you  are receiving this mail because you" +
                "requested for password reset click this  link this link will be expired after 5 minutes" + " " +url
            }
    
    
            smtptransport.sendMail(mailoptions,(err)=>{
                if(err)
                {
                    res.status(411).send(err)
                    //res.json(err)
                }
                else{
                    res.status(200).send("email sent successfully")
                    //res.json("email sent")
                }
            })
            // res.json(token)
    
        }
        else{
          res,json()
        }
    })


}


//get token attached with reset link

let tokendata;
let verifytoken=(req,res,next)=>
{

     
let token = req.params.token||req.query.token||req.body.token||req.headers.token
secure_js.jwtverify(token,secretkey,(err,userdetail)=>{
if(err)
{
    res.status(417).send(err)
}

else  {
   tokendata = userdetail.email;
  
  
}
})

next();




}

//password update

let resetpassword = (req,res)=>
{
    if(tokendata != undefined || tokendata != null)
    {

            console.log(tokendata)
        usermodel.userdatamodel.findOne({email:tokendata},(err,result)=>{
            if(err)
            {
                res.status(404).send(err)
              
            }
            else  
            {
               
                usermodel.userdatamodel.updateOne({password:secure_js.hashpassword(req.body.password)},(err,result)=>{
                    if(err)
                    {
                        res.status(409).send(err)
                      
                    }
                    else {
                       
                        res.status(200).send("password updated")
                       
                    }
                })
            }
        })
        

    }
    else{
        res.status(413).send("invalid token")
    }
    
}




//get token attached with dashboard link
let usertoken;
let userfullname;
function verifytoken2(req,res,next)
{ 
let token = req.query.token||req.body.token||req.params.token||req.headers.token

secure_js.jwtverify(token,secretkey,(err,userdetail)=>{
if(err)
{
    res.json(err)
}


else{
    usertoken = userdetail.email;
    userfullname = userdetail.firstname + " " + userdetail.lastname
   

}

})
next();

}


//find user name
let username = (req,res)=>{
    
    usermodel.userdatamodel.findOne({email:usertoken},(err,result)=>{
        if(err)
        {
            
            res.json(err)
           
        }
        if(!result)
        {
            let name = "user"
            return name
        }
        else{
            res.json(result.firstname)
            return result.firstname;
        }
    })
    
}



//create list of task

let worklist=(req,res)=>{
    new workmodel({
        email:usertoken,
        workname:req.body.workname
    }).save((err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
}


//list of all created task

let worklistdata = (req,res)=>{
    workmodel.find({email:usertoken},(err,result)=>{
        if(err)
        {
            res.json(err)
            return err;
        }
        else{
            res.json(result)
            return result;
        }
    })
}


//delete task on the basis of workname

let Deletetodolist= (req,res)=>
{
    workmodel.deleteOne({"workname":req.body.workname},(err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
}



let friendlist=(req,res)=>{
    usermodel.userdatamodel.find().exec((err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
}


let profileimageupload = (req,res)=>{
   usermodel.userimagemodel.findOne({email:usertoken},(err,result)=>{
       if(err){
           res.json(err)
       }
       else if(result){
           usermodel.userimagemodel.updateOne({image:req.body.image},(err,result)=>{
               if(err)
               {
                   res.json(err)
               }
               else{
                   res.json(result)
               }
           })
       }
       else{
           new usermodel.userimagemodel({
               email:usertoken,
               image:req.body.image
           }).save((err,result)=>{
               if(err)
               {
                   res.json(err)
               }
               else{
                   res.json(result)
               }
           })
       }
   })
}

let profileimageshow = (req,res)=>{
    usermodel.userimagemodel.findOne({email:usertoken},(err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else if(result){
            res.json(result.image)
        }
        else{
            res.json()
        }
    })
}





//database for notification 
let sendnotification = (req,res)=>{
   
  if(usertoken == req.body.recieveremail)
  {
      res.status(401).send("you cant send friend request to yourself")
  }

  else{
  usermodel.friendsmodel.findOne({$or:[{acceptedfriend:usertoken,acceptor:req.body.recieveremail}, {acceptor:usertoken,acceptedfriend:req.body.recieveremail}]},(err,result)=>{
      if(err)
      {
          res.json(err)
      }
      else if(result)
      {
          res.status(402).send("you are already friend with this person")
      }
      else{
        usermodel.notificationmodel.findOne({recieveremail:req.body.recieveremail },(err,result)=>{
            if(err)
            {
                res.json(err)
            }
            else if(result)
            {
                res.status(411).send("you have already sent a request")
            }
            else{
                new usermodel.notificationmodel({
                    requesteremail:usertoken,
                    requestername:userfullname,
                    recieveremail:req.body.recieveremail
    
                }).save((err,result)=>{
                    if(err)
                    {
                        res.json(err)
                    }
                    else{
                        res.json(result)
                    }
                })
            }
        })
    
      }
  })
  }
}

let rejectnotification = (req,res)=>{
    usermodel.notificationmodel.deleteOne({requesteremail:req.body.requesteremail},(err,result)=>{
        if(err)
        {
            res.json(err)

        }
        else{
            res.json(result)
        }
    })
}





let fetchnotification = (req,res)=>{
   
        usermodel.notificationmodel.find({recieveremail:usertoken},(err,result)=>{
            if(err)
            {
                res.json(err)
                return err;
            }
            else{
                res.json(result)
                return result;
            }
        })
    
}



let acceptedrequest = (req,res)=>{
   usermodel.friendsmodel.findOne({acceptedfriend:req.body.acceptedfriend,acceptor:usertoken},(err,result)=>{
       if(err)
       {
res.json(err)
       }
       else if(result)
       {
          
         res.status(411).send("already in friendlist")
       }
       else{
        new usermodel.friendsmodel({
            acceptedfriend:req.body.acceptedfriend,
        acceptor:usertoken,
        acceptorname:userfullname,
        friendsname:req.body.friendsname
        }).save((err,result)=>{
            if(err)
            {
                res.json(err)
            }
           else if(result)
           {
               usermodel.notificationmodel.deleteOne({"requesteremail":result.acceptedfriend},(err,result)=>{
                   if(err)
                   {
                       res.json(err)
                   }
                   else{
                       res.json(result)
                   }
               })
          
           }
        })
       }
   })
   
}


let acceptedfriendlist = (req,res)=>{
     usermodel.friendsmodel.find({acceptor:usertoken},(err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(result)
          
        }
    })
}


let worklistwithfriends = (req,res)=>{
    usermodel.friendsmodel.find({$or:[{acceptor:usertoken},{acceptedfriend:usertoken}]},(err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else if(result)
        {
        
            if(result[0] == undefined || result[0] == null || result[0] == [])
            {
                res.status(414).send("undefined friendship")
                
            }
            else{
                workmodel.find({$or:[{email:result[0].acceptedfriend},{email:result[0].acceptor}]},(err,result)=>{
                    if(err)
                    {
                        res.json(err)
                    }
                    else{
                        res.json(result)
                       
                    }
                })
            }
        }
        else{
            console.log("no friendship")
        }
    })
}

module.exports = {
    port:port,
    signup:signup,
    login:login,
    forget:forget,
    verifytoken:verifytoken,
    resetpassword:resetpassword,
    verifytoken2:verifytoken2,
    username:username,
    worklistdata:worklistdata,
    worklist:worklist,
    Deletetodolist:Deletetodolist,
    friendlist:friendlist,
    profileimageupload:profileimageupload,
    profileimageshow:profileimageshow,
    sendnotification:sendnotification,
    fetchnotification:fetchnotification,
    acceptedrequest:acceptedrequest,
    acceptedfriendlist:acceptedfriendlist,
    worklistwithfriends:worklistwithfriends,
    rejectnotification:rejectnotification

   
}

