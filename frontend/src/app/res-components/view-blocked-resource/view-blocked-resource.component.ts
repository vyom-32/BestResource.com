import { ActivatedRoute, Router } from '@angular/router';
import { ResourcesService } from 'src/app/services/resources.service';
import { Component, OnInit } from '@angular/core';
import resource from 'src/app/models/resource';

@Component({
  selector: 'app-view-blocked-resource',
  templateUrl: './view-blocked-resource.component.html',
  styleUrls: ['./view-blocked-resource.component.css']
})
export class ViewBlockedResourceComponent implements OnInit {

  resource_id = ""
  resource: resource = new resource()
  constructor(private resourcesService: ResourcesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.resource_id = params['id']
        this.resourcesService.getResourceById(this.resource_id)
          .subscribe((resource: resource) => {
            this.resource = resource
          })
      })
  }

  unblockResource(){
    if(confirm("Are You sure to unblock this resource"))
    {
      this.resource.status = "active"
      this.resourcesService.unblockResource(this.resource._id,this.resource)
        .subscribe((resource: resource) => {
          this.resource = resource
        })
    }
  }

}
