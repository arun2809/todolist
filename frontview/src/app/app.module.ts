import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http'
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { FriendlistComponent } from './friendlist/friendlist.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    ResetpasswordComponent,
    FriendlistComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    
    
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  
  
    
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'signup',component:RegisterComponent},
      {path:'login',component:HomeComponent},
      {path:'dashboard',component:DashboardComponent,canActivate:[ApiService]},
      {path:'reset',component:ResetpasswordComponent},
      {path:'friends',component:FriendlistComponent,canActivate:[ApiService]}
    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
