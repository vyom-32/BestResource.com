import { UsersService } from './../../services/users.service';
import { ResourcesService } from './../../services/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import resource from 'src/app/models/resource';
import comment from 'src/app/models/comment';
import user from 'src/app/models/user';
import report from 'src/app/models/report';


@Component({
  selector: 'app-view-reported',
  templateUrl: './view-reported.component.html',
  styleUrls: ['./view-reported.component.css']
})
export class ViewReportedComponent implements OnInit {

  id = "";
  resource: resource = new resource()
  report: report = new report()
  comments: comment[] = []
  res_owner: user = new user()
  reporter: user = new user()
  users: user[] = []
  other_resources: resource[] = []
  constructor(private router: Router, private route: ActivatedRoute, private resourcesService: ResourcesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.id = params['id'];
        this.resourcesService.getReportById(this.id)
          .subscribe((report: report) => {
            this.report = report
            this.usersService.getUserById(this.report.user_id)
              .subscribe((user: user) => {
                this.reporter = user
              })
            this.resourcesService.getResourceById(this.report.resource_id)
              .subscribe((resource: resource) => {
                this.resource = resource
                this.resourcesService.getCommentsForGivenResource(this.resource._id)
                  .subscribe((comments: comment[]) => {
                    this.comments = comments
                    console.log(this.comments)
                  })
                this.resourcesService.getResourceByUser(this.resource.user_id)
                  .subscribe((resources: resource[]) => {
                    this.other_resources = resources
                  })

                this.usersService.getUserById(this.resource.user_id)
                  .subscribe((user: user) => {
                    this.res_owner = user
                  })
              })
          })
        this.usersService.getUsers()
          .subscribe((users: user[]) => {
            this.users = users
          })
      })
  }

  ClearAllReports() {
    this.resourcesService.clearReportsByResource(this.resource._id)
      .subscribe(() => {
        alert("All the Reports are cleared for this Resource")
        this.router.navigate(['resource/reported'])
      },
        (err) => {
          console.log(err)
        })
  }

  BlockResource() {
    this.resource.status = "blocked"
    this.resourcesService.blockResource(this.resource._id, this.resource)
      .subscribe(() => {
        alert("Resource Blocked Successfully")
        this.router.navigate(['resource/reported'])
      },
        (err) => {
          console.log(err)
        })
  }

  BlockUser() {
    this.resource.status = "blocked"
    this.resourcesService.blockResource(this.resource._id, this.resource)
      .subscribe(() => {
        console.log("resource blocked")
      })
      this.res_owner.status = "blocked"
    this.usersService.blockUser(this.resource.user_id,this.res_owner)
      .subscribe(() => {
        alert("User Blocked Successfully")
        this.router.navigate(['resource/reported'])
      },
        (err) => {
          console.log(err)
        })
  }

  getUserEmail(user_id) {
    for (var user of this.users) {
      if (user._id == user_id) {
        return user.email
      }
    }
  }

}
