import { ResourcesService } from './../../services/resources.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import searchString from 'src/app/models/searchString';
import resource from 'src/app/models/resource';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText = "";
  searchStrings : searchString[] = []
  resources : resource[] = []


  constructor(private router: Router, private resourcesService: ResourcesService) { }

  ngOnInit(): void {
    this.resourcesService.getSearchStrings()
      .subscribe((searchStrings: searchString[]) => {
        this.searchStrings = searchStrings
      },
      (error) => console.log(error))
  }

  search(ss){
    this.resourcesService.getActiveResourceByTopic(ss)
      .subscribe((resources:resource[]) => {
        this.resources = resources
        console.log(resources)
        document.getElementById("resources").hidden = false
        document.getElementById("search_table").hidden = true
        //document.getElementById("search_container").hidden = true
      },
      (error) => console.log("error")
      )
  }

  viewResource(id){
    this.router.navigate(['resource/view'],{queryParams: {'id' : id}})
  }

  // searchfocus(){
  //   console.log("focus in")
  //   document.getElementById("search_table").hidden = false
  // }

  // searchblur(){
  //   console.log("focus out")
  //   document.getElementById("search_table").hidden = true
  // }
}
