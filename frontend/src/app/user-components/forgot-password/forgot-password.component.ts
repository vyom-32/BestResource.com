import  user  from 'src/app/models/user';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  Data = {
    email: "",
  }
  user: user = new user()
  otp: string = ""
  password = ""
  confirm_password =""
  entered_otp = "";

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  send_otp() {
    console.log(this.Data.email)
    this.usersService.sendOTP(this.Data).subscribe((otp: string) => {
      this.otp = otp
      console.log(otp)
      document.getElementById('otp_div').hidden = false
      document.getElementById('send_otp').hidden = true
      document.getElementById('verify_otp').hidden = false
    })
  }

  verify_otp() {
    if ((this.entered_otp) == this.otp) {
        this.usersService.getUserByEmail(this.Data.email)
          .subscribe((user: user) => {
            this.user = user;
          })
        document.getElementById('password').hidden = false
        document.getElementById('confirm_password').hidden = false
        document.getElementById('update_password').hidden = false
        document.getElementById('verify_otp').hidden = true

    }
    else {
      document.getElementById('message').innerHTML = "OTP Doesn't match"
    }
  }

  updatePassword(){
    if(this.password == this.confirm_password){
      document.getElementById('main_div').hidden = true
      document.getElementById('message2').innerHTML = "Updating Password"
      this.user.password = this.password
      this.usersService.updateUser(this.user,this.user._id)
        .subscribe((user:user) => {
          console.log("password changed for user "+user.email)
          alert("Password changed successfully :)")
          this.router.navigate([''])
        })
    }
    else{
      document.getElementById('message').innerHTML = "please check the passwords, passwords didn't match"
    }
  }

}
