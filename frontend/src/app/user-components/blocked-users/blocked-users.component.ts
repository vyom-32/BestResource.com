import { UsersService } from './../../services/users.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import user from 'src/app/models/user';
import resource from 'src/app/models/resource';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {

  users: user[] = []
  constructor(private resourcesService:ResourcesService, private usersService:UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getBlocked()
      .subscribe((users: user[]) => {
        this.users = users
        console.log(this.users)
      })
  }

  viewUser(id: string){
    this.router.navigate(['users/view_blocked'],{queryParams : {'id': id}})
  }
}
