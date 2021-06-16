import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './../../services/resources.service';
import { Router } from '@angular/router';
import resource from 'src/app/models/resource';
import report from 'src/app/models/report';


@Component({
  selector: 'app-reported',
  templateUrl: './reported.component.html',
  styleUrls: ['./reported.component.css']
})
export class ReportedComponent implements OnInit {

  resources : resource[] = []
  reports : report[] = []
  constructor(private router: Router, private resourcesService: ResourcesService) { }

  ngOnInit(): void {
    this.resourcesService.getReported()
      .subscribe((reports: report[]) => {
        this.reports = reports
        console.log(this.reports)
      })
  }

  viewResource(id){
    this.router.navigate(['resource/view_reported'],{queryParams: {'id' : id}})
  }

}
