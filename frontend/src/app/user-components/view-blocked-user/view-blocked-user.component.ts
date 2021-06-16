import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import resource from 'src/app/models/resource';
import user from 'src/app/models/user';
import { ResourcesService } from 'src/app/services/resources.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-blocked-user',
  templateUrl: './view-blocked-user.component.html',
  styleUrls: ['./view-blocked-user.component.css']
})
export class ViewBlockedUserComponent implements OnInit {

  user_id = ""
  user: user = new user()
  resources: resource[] = []
  constructor(private resourcesService:ResourcesService, private usersService:UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.user_id = params['id']
      })
    this.usersService.getUserById(this.user_id)
      .subscribe((user: user) => {
        this.user = user
        this.resourcesService.getResourceByUser(this.user._id)
          .subscribe((resources: resource[]) => {
            this.resources = resources
          })
      })
  }
  unblockUser(){
    if(confirm("Are you sure to unblock this user")){
      this.user.status = "active"
      this.usersService.unblockUser(this.user._id,this.user)
        .subscribe((user: user) => {
          alert("user unblocked successfully")
          this.router.navigate(['users/blocked'])
        })
    }
  }

}
