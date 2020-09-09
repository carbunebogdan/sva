import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FormErrorComponent } from './components/form-error/form-error.component';



@NgModule({
  declarations: [QuestionnaireComponent, FormErrorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    QuestionnaireComponent,
    FormErrorComponent,
    CommonModule
  ]
})
export class QuestionnaireModule { }
