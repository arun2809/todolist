import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
password;
confirm_passwprd
$:any;
  constructor(public _httpserv:ApiService,private activatedsroute:ActivatedRoute,private toaster:ToastrService,public route:Router) { }

  ngOnInit() {
   let url1= this.activatedsroute.snapshot.queryParamMap.getAll('token')
  localStorage.setItem('token1',url1[0].toString())
  }


  resetpasword()
  {
   if(this.password == this.confirm_passwprd)
   {
      
    this._httpserv.passwordreset({password:this.password}).subscribe(data=>{
     
      
      if(data)
      {
        this.toaster.success()
      }
    },error=>{
      if(error.status == 404)
      {
      this.toaster.warning("token is invalid")
      }
      else if(error.status == 409)
      {
        this.toaster.warning("token has expired")
      }
      else if(error.status == 200)
      {
        this.toaster.success("password reset successfully")
        this.route.navigateByUrl('/login')
        localStorage.removeItem('token1')
      }
      else if(error.status == 413)
      {
        this.toaster.warning("token is undefined")
      }
      else if(error.status == 417)
      {
        this.toaster.warning("link has expired")
      }
    })

   }
   else{
     this.toaster.warning("confirm password did not match with new password")
   }
  }

}
