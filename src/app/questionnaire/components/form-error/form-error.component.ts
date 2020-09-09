import { Component, OnInit, Input } from '@angular/core';
import { FormErrorService } from '../../services/form-error/form-error.service';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  error = null;
  @Input() backgroundColor;
  @Input() textColor;
  constructor(private formErrorService: FormErrorService) { }

  ngOnInit(): void {
    // subscribe to error notifications
    this.formErrorService.getErrors().subscribe((error) => {
      this.showError(error);
    })
  }

  showError = (error) => {
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, 5000)
  }

  closeError = () => {
    this.error = null;
  }

}
