import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import resource from 'src/app/models/resource';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-my-resources',
  templateUrl: './my-resources.component.html',
  styleUrls: ['./my-resources.component.css']
})
export class MyResourcesComponent implements OnInit {

  resources : resource[] = []
  constructor(private router: Router, private resourcesService: ResourcesService) { }

  ngOnInit(): void {
    this.resourcesService.getResourceByUser(sessionStorage.getItem('user_id'))
      .subscribe((resources: resource[]) => {
        this.resources = resources
        console.log(this.resources)
      })
  }

  viewResource(id: string){
    this.router.navigate(['resource/view_my'],{queryParams: {'id' : id}})
  }


}
