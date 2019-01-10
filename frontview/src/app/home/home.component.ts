import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from "jquery";

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
countryname;
countryname1 = ["name","city","hii"]
 $:any;
 email;
 password;
 email_forget;
  constructor(private _httpserv:ApiService,private spinner: NgxSpinnerService,
    private activatedroute:ActivatedRoute,public toastr:ToastrService,public route:Router)
   
  {
    
   }

  ngOnInit() {

    let stringquery=this.activatedroute.snapshot.queryParamMap.getAll('keys')
    console.log(stringquery)

  

  }



  forgetbutton()
  {
    $('.forget1').css("visibility","visible") && $('.loginform').css('visibility','hidden')
    && $('p').css('visibility','hidden') && $('.forget1').css({top: 100,  position:'absolute'})

  }



//send reset link on email

  resetpassword()
  {
    if(!this.email)
{
  this.toastr.warning("please enter email","",{timeOut:1000})
}
else{

  this.spinner.show();
 
  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._httpserv.forgetpassword({email:this.email}).subscribe(data=>{
        // localStorage.setItem('token1',data.toString())
        // if(data)
        // {
        //   this.toastr.success("email sent to " +this.email)
        // }
    console.log(data)
      },
      error=>{
        if(error.status == 404)
        {
          this.toastr.warning("not a valid email","",{timeOut:1000})
        }
        else if(error.status == 409)
        {
    this.toastr.warning("email not registered","",{timeOut:1000})
        }
        else if(error.status == 411)
        {
          this.toastr.warning("check your internet connection")
        }
        else if(error.status == 200)
        {
          this.toastr.success("email sent to " +this.email)
          this.route.navigateByUrl('/login')
     
    
        }
       
      })

      this.spinner.hide();
  }, 200);






 
}
    
  }




  gotosignup()
  {
this.route.navigateByUrl('/signup')
  }

  login()
  {
    

    if(!this.email)
    {
      
      this.toastr.warning("please enter email","",{timeOut:1000})
    }
    else if(!this.password)
    {
      this.toastr.warning("please enter password","",{timeOut:1000})
    }
    else{
      this._httpserv.loginservice({email:this.email,password:this.password}).subscribe(data=>{
        localStorage.setItem('token',data.toString())
        if(data)
        {
          this.toastr.success("login successful","",{timeOut:1000})
          this.route.navigateByUrl('/dashboard')
        }
      
      },
      error=>{
        if(error.status == 409)
        {
          this.toastr.warning("email not registered","",{timeOut:1000})
        }
        else if(error.status == 411)
        {
          this.toastr.warning("wrong password","",{timeOut:1000})
        }
        

      }
      )
      
    }
  }

}
