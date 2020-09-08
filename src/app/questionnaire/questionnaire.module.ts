import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';
import { FormErrorComponent } from './form-error/form-error.component';



@NgModule({
  declarations: [QuestionnaireComponent, QuestionComponent, FormErrorComponent],
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
