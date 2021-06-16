import { UsersService } from './../../services/users.service';
import { ResourcesService } from './../../services/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import resource from 'src/app/models/resource';
import comment from 'src/app/models/comment';
import user from 'src/app/models/user';
import report from 'src/app/models/report';
import ratting from 'src/app/models/ratting';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private resourcesService: ResourcesService, private usersService: UsersService) { }

  id = "";
  resource: resource = new resource()
  new_comment: comment = new comment()
  new_report: report = new report()
  comments: comment[] = []
  users: user[] = []
  new_ratting : ratting = new ratting()
  ratting : ratting = new ratting()
  rattings: ratting[] = []
  ratting_index: number = 0.0

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.id = params['id'];
        this.resourcesService.getResourceById(this.id)
          .subscribe((resource: resource) => {
            this.resource = resource
            this.resourcesService.getCommentsForGivenResource(this.id)
              .subscribe((comments: comment[]) => {
                this.comments = comments
              })
            this.resourcesService.getRattings(this.id)
              .subscribe((ratting: ratting[]) => {
                this.rattings = ratting
                this.calculateRatting()
              })
            this.resourcesService.getRattingsByUser(sessionStorage.getItem('user_id'),this.resource._id)
              .subscribe((ratting: ratting) => {
                if(ratting[0] == undefined){
                  document.getElementById("rate_div").hidden = false
                }
                else{
                  document.getElementById("rate_div").hidden = true
                }
              })
            this.usersService.getUsers()
              .subscribe((users: user[]) => {
                this.users = users
              })
          })
      })
  }

  @Input()
  get foo() {
    return this.resource.link
  }

  calculateRatting(){
    for(let i=0;i<this.rattings.length;i++){
      this.ratting_index = this.ratting_index + this.rattings[i].ratting
    }
    this.ratting_index = this.ratting_index/this.rattings.length
    if(this.rattings.length == 0){
      this.ratting_index = 0
    }
  }

  rate(){
    this.new_ratting.user_id = sessionStorage.getItem('user_id')
    this.new_ratting.resource_id = this.resource._id
    this.resourcesService.addRatting(this.new_ratting)
      .subscribe((ratting: ratting) => {
        window.location.reload()
      })
  }

  refreshComments() {
    this.resourcesService.getCommentsForGivenResource(this.resource._id)
      .subscribe((comments: comment[]) => {
        this.comments = comments
        console.log("Comments Updated")
      })
  }

  getUserEmail(user_id) {
    for (var user of this.users) {
      if (user._id == user_id) {
        return user.email
      }
    }
  }

  addComment() {
    this.new_comment.resource_id = this.resource._id;
    this.new_comment.user_id = sessionStorage.getItem('user_id')
    this.new_comment.is_primary = "yes"
    this.new_comment.reply_to = "none"
    this.resourcesService.addComment(this.new_comment)
      .subscribe((comment: comment) => {
        console.log(comment)
        this.new_comment.comment = ""
        this.refreshComments()
      })
  }

  deleteComment(comment_id) {
    if (confirm("Are you sure you want do delete this comment?")) {
      this.resourcesService.deleteComment(comment_id)
        .subscribe((comment: comment) => {
          console.log("deleted Comment " + comment)
          this.refreshComments()
        })
    }
  }

  ownComment(comment: comment){
    if(comment.user_id == sessionStorage.getItem('user_id') ||  this.resource.user_id == sessionStorage.getItem('user_id')){
      return true
    }
    return false
  }

  report_btn_click(){
    document.getElementById("report_div").hidden = false
  }

  notOwnResource(){
    if(sessionStorage.getItem('user_id') != this.resource.user_id)
    {
      return true
    }
    return false
  }

  addReport(){
    this.new_report.resource_id = this.resource._id
    this.new_report.user_id = sessionStorage.getItem('user_id')
    this.resourcesService.addReport(this.new_report)
      .subscribe((report: report) => {
        console.log("reported "+report)
        document.getElementById("report_div").hidden = true
        alert("Resource reported successfully")
      })
  }

}
