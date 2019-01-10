import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
firstname;
lastname;
email;
mobileno;
password;
  constructor(public _httpserv:ApiService,public spinner:NgxSpinnerService,
    private toaster:ToastrService,public route:Router) { }

  ngOnInit() {
  }

  gotologinpage()
  {
    this.route.navigateByUrl('/login')

  }


  //user registration part
  register()
  {
    if(!this.firstname)
    {
      this.toaster.warning("enter firstname")
    }
    else if(!this.lastname)
    {
      this.toaster.warning("enter lastname")
    }
    else if(!this.email)
    {
      this.toaster.warning("enter email")
    }
    else if(!this.password)
    {
      this.toaster.warning("enter password")
    }
    else if(!this.mobileno)
    {
      this.toaster.warning("enter mobileno")
    }
    else{
    this.spinner.show();
    setTimeout(() => {
      
      this._httpserv.signupservice({firstname:this.firstname,lastname:this.lastname
        ,email:this.email,password:this.password,mobileno:this.mobileno}).subscribe(data=>{
          if(data)
          {
                this.toaster.success("registration successful")
                this.route.navigateByUrl('/login')
           
           
          }
        },error=>{
          if(error.status==404)
          {
            this.toaster.warning("email already registered")
          }
          else if(error.status == 409)
          {
            this.toaster.warning("invalid email id")
          }
          else if(error.status == 411)
          {
            this.toaster.warning("check mobile number")
          }
        })

        this.spinner.hide();
    }, 4000);
      }
  }


}
