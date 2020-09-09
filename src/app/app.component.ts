import { Component } from '@angular/core';
import { InitService } from './core/services/init.service';
import { FormErrorService } from './questionnaire/services/form-error/form-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sva-questionnaire';
  translations;
  questionnaire;
  design;
  rules;

  phase = 0; // 0- INTRO, 1- QUESTIONS, 2- OUTRO
  subPhase = 0; // current question index

  quizData; // raw quiz data
  loaded = false;

  constructor(private initService: InitService, private formErrorService: FormErrorService) {
    this.initApp();
  }

  initApp = () => {
    this.initService.getStructure().then((structure: any) => {
      this.rules = structure.rules;
      this.translations = structure.translations[structure.language_id];
      this.questionnaire = structure.questionblocks[0];
      this.design = structure.design;
      this.formErrorService.init(this.translations.messages);
    }, (err) => {
      this.questionnaire = null;
      console.error(err);
    }).finally(() => {
      this.loaded = true;
    });
  }

  changePhase = (event) => {
    this.phase = event.phase;

    if (event.data) {
      this.quizData = event.data;
    }
  }

}
