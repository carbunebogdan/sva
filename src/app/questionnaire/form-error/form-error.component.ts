import { Component, OnInit } from '@angular/core';
import { FormErrorService } from '../form-error.service';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  error = null;
  constructor(private formErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.formErrorService.getErrors().subscribe((error) => {
      this.showError(error)
    })
  }

  showError = (error) => {
    this.error = error;
    console.log(error);
    setTimeout(() => {
      this.error = null;
    }, 10000)
  }

  closeError = () => {
    this.error = null;
  }

}
