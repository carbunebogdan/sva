import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) { }

  getStructure(){
    return this.http.get('v1/surveys/cnavjmzg?isMobile=true&expand=true').toPromise();
  }
}
