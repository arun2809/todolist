import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';

import { CanActivate,ActivatedRouteSnapshot,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private socket;
  constructor(public _http:HttpClient,public route:Router)
   {}
  

   canActivate(routes:ActivatedRouteSnapshot):boolean{
    if(localStorage.getItem('token') == undefined || null)
    {
      this.route.navigateByUrl('/login')
      return false
    }
    else{
      return true
    }
  }

   private handleError(error: any) { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return  throwError (error);
    }
//login 
   loginservice(logindata)
   {
     return this._http.post('http://localhost:4600/login',logindata)
     .map(res => res)
     .catch(this.handleError);
   }

//user registration
   signupservice(signupdata)
   {
    return this._http.post('http://localhost:4600/register',signupdata)
    .map(res => res)
    .catch(this.handleError);
   }

//get password link on email
   forgetpassword(forgetdata)
   {
     return this._http.post('http://localhost:4600/forget',forgetdata)
     .map(res => res)
     .catch(this.handleError);

   }


//reset password

   passwordreset(resetpassworddata)
   {
     return this._http.post('http://localhost:4600/reset',resetpassworddata,{
       observe:'body',
       params:new HttpParams().append('token',localStorage.getItem('token1'))
     })
     .map(res => res)
     .catch(this.handleError);

   }

//username for dashboard
   userdetails()
   {
     return this._http.get('http://localhost:4600/userid',{
      observe:'body',
      params:new HttpParams().append('token',localStorage.getItem('token'))
    })
   }


   //create todo list

   createtodo(tododata)
   {
    return this._http.post('http://localhost:4600/todolist',tododata,{
      observe:'body',
      params:new HttpParams().append('token',localStorage.getItem('token'))
    })
  
     
   }

   //view todo list

   viewtododata()
   {
    return this._http.get('http://localhost:4600/displaytodolist',{
      observe:'body',
      params:new HttpParams().append('token',localStorage.getItem('token'))

    })
   }


   //delete todo list

   deletetask(deletetaskdata){
     return this._http.post('http://localhost:4600/deletetask',deletetaskdata)
   }


   //list of friends
   friendlist()
   {
    return this._http.get('http://localhost:4600/friendlist')
   }


   //upload profile pic 
   profilepicupload(imageurl)
   {
     return this._http.post('http://localhost:4600/uploadpic',imageurl,{
       observe:'body',
       params:new HttpParams().append('token',localStorage.getItem('token'))
     })
   }


   //display profile pic
   showprofilepic()
   {
     return this._http.get('http://localhost:4600/showpic',{
       observe:'body',
       params:new HttpParams().append('token',localStorage.getItem('token'))
     })
   }


   //send friend request

   sendnotification(recieveremaildata)
   {
     return this._http.post('http://localhost:4600/sendnotification',recieveremaildata,{
       observe:'body',
       params:new HttpParams().append('token',localStorage.getItem('token'))
     }).map(res=>res)
     .catch(this.handleError)
   }


   //reject friend request
   rejectnotification(rejectnotificationdata)
   {
     return this._http.post('http://localhost:4600/rejectnotification',rejectnotificationdata)
   }


   //see friend request notification

   fetchnotification()
   {
     return this._http.get('http://localhost:4600/fetchnotification',{
       observe:'body',
       params:new HttpParams().append('token',localStorage.getItem('token'))
     }).map(res=>res)
     .catch(this.handleError)
   }


   //accept friend request
   acceptedreuest(acceptedreuestdata)
   {
   return this._http.post('http://localhost:4600/acceptedrequest',acceptedreuestdata,{
     observe:'body',
     params:new HttpParams().append('token',localStorage.getItem('token'))
   })
   }

//see name of friends 

   acceptedfriendlist()
   {
   return this._http.get('http://localhost:4600/acceptedfirendlist',{
     observe:'body',
     params:new HttpParams().append('token',localStorage.getItem('token'))
   })
   }

   //todo list with friends

   worklistwithfriends()
   {
    return this._http.get('http://localhost:4600/worklistwithfriends',{
      observe:'body',
      params:new HttpParams().append('token',localStorage.getItem('token'))
    })

   }
}
