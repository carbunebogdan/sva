import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  private handler = new Subject<any>();
  private messages;
  
  init(possibleMessages) {
    this.messages = possibleMessages;
  }

  getPossibleMessages() {
    return this.messages;
  }

  showError(error: any) {
    this.handler.next({
      title: this.messages[error.error[0]][error.error[1]],
      data: error.data
    });
  }

  clearErrors() {
    this.handler.next();
  }

  getErrors(): Observable<any> {
    return this.handler.asObservable();
  }
}
