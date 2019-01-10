import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
friends;
  constructor(public _httpserv:ApiService,public route:Router,private toaster:ToastrService) { }

  ngOnInit() {
this._httpserv.friendlist().subscribe(data=>{
  console.log(data)
  this.friends = data
})
  }

  gotodashboard()
  {
    this.route.navigateByUrl('/dashboard')
  }

  sendRequest(email)
  {
   
   this._httpserv.sendnotification({recieveremail:email}).subscribe(data=>{
     console.log(data)
     if(data)
     {
       this.toaster.success("friend request sent","",{timeOut:1000})
     }
   },error=>{
     if(error.status == 401)
     {
       this.toaster.warning("you can't send request to yourself","",{timeOut:1000})
      
     }
     else if(error.status == 402)
     {
       this.toaster.warning("you are already friend with this person","",{timeOut:1000})
     }
     else if(error.status == 411)
     {
       this.toaster.warning("you already sent a request","",{timeOut:1000})
     }
   })
  }

}
