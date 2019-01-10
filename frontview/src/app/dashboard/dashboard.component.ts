import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ChildActivationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';

import * as $ from "jquery"
import { identifierModuleUrl } from '@angular/compiler';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
username;
workname;
serialNumber;
workdata;
profilepic;
imageurl;
notification;
notificationnumber;
friendlist;
worklistwithfriends;

$:any;
  constructor(public _httpserv:ApiService,private toaster:ToastrService,
    public route:Router) { }

  ngOnInit() {
    this._httpserv.userdetails().subscribe(data=>{
      this.username =data;
      console.log(this.username)
    })

    this._httpserv.viewtododata().subscribe(data=>{
      this.workdata = data;
      console.log(this.workdata)
    })

    this._httpserv.showprofilepic().subscribe(data=>{
      this.profilepic = data;
      console.log(this.profilepic)
    
    })

    this._httpserv.fetchnotification().subscribe(data=>{
      this.notification = data;
  this.notificationnumber = this.notification.length;
   
      console.log(this.notification)
    })

    this._httpserv.acceptedfriendlist().subscribe(data=>{
     this.friendlist = data;
     console.log(this.friendlist)
    })

    this._httpserv.worklistwithfriends().subscribe(data=>{
     this.worklistwithfriends = data;
    })

 
  }


  




  deletetask(list)
  {
    this._httpserv.deletetask({workname:list}).subscribe(data=>{
       if(data)
       {
         location.reload()
       }
    })
  }


  logout()
  {
    localStorage.removeItem('token')
    this.route.navigateByUrl('/login')
    
  }

  createtodolist()
  {
    if(!this.workname)
    {
      this.toaster.warning("workname is required","" ,{timeOut:1000})
    }
 
   else{
    this._httpserv.createtodo({workname:this.workname}).subscribe(data=>{
      console.log(data)
      if(data)
      {
        this.toaster.success("task created","",{timeOut:1000})
        // this.route.navigateByUrl('/dashboard')
        location.reload()
       
      }
     
    
    })
  
    
   }
  }

  friendspage()
  {
    this.route.navigateByUrl('/friends')
  }

notifier()
{
  if($('.notification').css("display")==="none")
  {
    $('.notification').css("display","inline-flex")
  }
  else{
    $('.notification').css("display","none")
  }
 
  
}



//upload profile pic
onfileselected()
{
  
  this._httpserv.profilepicupload({image:this.imageurl}).subscribe(data=>{
    console.log(data)
    location.reload()
  })
}


acceptrequest(requestername,requesteremail)
{
  this._httpserv.acceptedreuest({acceptedfriend:requesteremail,friendsname:requestername}).subscribe(data=>{
    console.log(data)
    if(data)
    {
  
      this.toaster.success("request accepted","",{timeOut:1000})
      this.route.navigateByUrl('/dashboard')
    }
  },
  error=>{
    if(error.status == 411)
    {
      this.toaster.warning("you are already friend with this person","",{timeOut:1000})
      
     
    }

  })
}

rejectrequest(requesteremail){
  this._httpserv.rejectnotification({requesteremail:requesteremail}).subscribe(data=>{
    console.log(data)
    if(data)
    {
      this.toaster.warning("you reject this request","",{timeOut:1000})
      location.reload()
    }
  })
}

}
