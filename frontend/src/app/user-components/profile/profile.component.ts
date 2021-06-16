import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import user from 'src/app/models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:user = new user()
  constructor(private router:Router, private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserById(sessionStorage.getItem('user_id'))
      .subscribe((user:user) => {
        this.user = user
      })
  }

  updateProfile(){
    this.usersService.updateUser(this.user,this.user._id)
      .subscribe((user: user) => {
        alert("User Name Updated Successfully")
        this.usersService.getUserById(this.user._id)
          .subscribe((user: user) => {
            this.user = user
          })
      })
  }

  myResources(){
    this.router.navigate(['/resource/my'])
  }

}
