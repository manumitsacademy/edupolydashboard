import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  apiUrl:string="https://us-central1-edupoly-backend-9d585.cloudfunctions.net/app/tutorial";
  technologyList:any;
  constructor(private http:HttpClient) { }

  getAlltechnologies(){
    return this.http.get(`${this.apiUrl}/technologiesList`);
  }

  getTutorialListByTechnologyId(techId:any){
    return this.http.get(`${this.apiUrl}/tutorialListByTechnologyId?technologyId=${techId}`);
  }

  getConceptListByTutorialId(tutId:any){
    return this.http.get(`${this.apiUrl}/conceptListByTutorialId?tutorialId=${tutId}`);
  }

  getTopicsByConceptId(conceptId:any){
    return this.http.get(`${this.apiUrl}/topicsByConceptId/${conceptId}`);
  }

  addTechnology(formContent:any){
    return this.http.post(`${this.apiUrl}/addTechnology`,formContent);
  }

  addTutorial(formContent:any){
    return this.http.post(`${this.apiUrl}/addTutorial`,formContent);
  }

  addConcept(formContent:any){
    return this.http.post(`${this.apiUrl}/addConcept`,formContent);
  }

  addTopic(formContent:any){
    return this.http.post(`${this.apiUrl}/addTopic`,formContent);
  }

  deleteTopic(topicId:any,conceptId:any){
    return this.http.delete(`${this.apiUrl}/deleteTopicById/${topicId}/${conceptId}`);
  }

  updateTopic(formContent:any){
    return this.http.put(`${this.apiUrl}/updateTopicByTopicId`,formContent);
  }
}
