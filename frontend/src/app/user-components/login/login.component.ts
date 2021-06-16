import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import user from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:user = new user();
  loginData={
    email : "",
    password : ""
  }

  constructor(private _router:Router, private usersService:UsersService, private appComponent:AppComponent) { }

  ngOnInit(): void {
  }

  Login(){
    this.usersService.loginUser(this.loginData)
      .subscribe(
        (user: user) => {
          this.user = user,

          sessionStorage.clear()
          sessionStorage.setItem('logged_in',"logged in"),
          sessionStorage.setItem('user_id',user._id)
          sessionStorage.setItem('user_email',user.email)
          this.appComponent.update_nav()
          this._router.navigate(['/'])
        },
        err => {
          console.log(err)
          document.getElementById("message").innerHTML=err.error

        }
      )
  }

}
