import  comment  from 'src/app/models/comment';
import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import resource from 'src/app/models/resource';
import report from '../models/report';
import ratting from '../models/ratting';


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private webService: WebService) { }

  createResource(resource: resource){
    return this.webService.post(`resource`, resource);
  }

  updateResource(id: string,resource: resource){
    return this.webService.patch(`resource/${id}`,resource);
  }

  deleteResource(id: string){
    console.log("delete Request")
    return this.webService.get(`delete_resource/${id}`)
  }

  getSearchStrings(){
    return this.webService.get(`search`);
  }

  getActiveResourceByTopic(topic: string){
    console.log(topic)
    return this.webService.get(`active_resource_by_topic/${topic}`);
  }

  getResourceById(id: string){
    return this.webService.get(`resource/${id}`);
  }

  getResourceByUser(id: string){
    return this.webService.get(`resource_by_user/${id}`);
  }

  addComment(comment: comment){
    return this.webService.post(`comments`,comment)
  }

  deleteComment(comment_id: string){
    return this.webService.delete(`comments/${comment_id}`)
  }

  getCommentsForGivenResource(r_id: string){
    return this.webService.get(`comments_by_resource/${r_id}`)
  }

  addReport(report: report){
    return this.webService.post(`reports`,report)
  }

  getReported(){
    return this.webService.get(`reports`)
  }

  getBlocked(){
    return this.webService.get(`blocked_resource`)
  }

  getReportById(id: string){
    return this.webService.get(`reports/${id}`)
  }

  clearReportsByResource(id: string){
    return this.webService.delete(`reports_by_resource/${id}`)
  }

  blockResource(id: string,resource: resource){
    return this.webService.patch(`blockResource/${id}`,resource)
  }

  unblockResource(id: string,resource: resource){
    return this.webService.patch(`unblockResource/${id}`,resource)
  }

  addRatting(ratting: ratting){
    return this.webService.post(`rate`,ratting)
  }

  getRattings(id: string){
    return this.webService.get(`rattingsByResource/${id}`)
  }

  getRattingsByUser(id: string,r_id: string){
    return this.webService.get(`rattingsByUser/${id}/${r_id}`)
  }
}
