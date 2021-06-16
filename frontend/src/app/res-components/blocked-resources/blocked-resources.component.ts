import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import resource from 'src/app/models/resource';
import { ResourcesService } from 'src/app/services/resources.service';


@Component({
  selector: 'app-blocked-resources',
  templateUrl: './blocked-resources.component.html',
  styleUrls: ['./blocked-resources.component.css']
})
export class BlockedResourcesComponent implements OnInit {

  resources : resource[] = []
  constructor(private router: Router, private resourcesService: ResourcesService) { }

  ngOnInit(): void {
    this.resourcesService.getBlocked()
      .subscribe((resources: resource[]) => {
        this.resources = resources
        console.log(this.resources)
      })
  }

  viewResource(id: string){
    this.router.navigate(['resource/view_blocked'],{queryParams: {'id' : id}})
  }

}
