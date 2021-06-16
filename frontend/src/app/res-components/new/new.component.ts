import { Router } from '@angular/router';
import { ResourcesService } from './../../services/resources.service';
import { Component, OnInit } from '@angular/core';
import resource from 'src/app/models/resource';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  resource:resource = new resource()
  constructor(private resourcesService:ResourcesService, private router:Router) { }

  ngOnInit(): void {
  }

  AddResource(){
    this.resource.user_id = sessionStorage.getItem('user_id')
    this.resource.status = "active"
    this.resourcesService.createResource(this.resource)
      .subscribe((resource:resource) => {
        console.log("Resource Created");
        this.router.navigate([''])
      })
  }

}
