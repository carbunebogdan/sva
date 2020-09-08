import { Component } from '@angular/core';
import { QuestionnaireService } from './core/services/questionnaire.service';
import { FormErrorService } from './questionnaire/form-error.service';

class Question {
  constructor(title, answers, mandatory, editable, params) {

  }
}

class Questionnaire {
  questions: Question[] = [];
  currQuestion = 0;
  constructor(questions: any) {
    questions.forEach((q) => {
      this.questions.push(new Question(q.translations['1'].text, q.answers, q.mandatory, q.editable, q.params))
    });
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sva-questionnaire';
  questionnaireStructure = undefined;
  translations = null;
  questionnaire;

  phase = 1; // 0- INTRO, 1- QUESTIONS, 2- OUTRO
  subPhase = 0; // current question index

  quizResponse;

  constructor(private questionnaireService: QuestionnaireService, private formErrorService: FormErrorService) {
    this.initApp();
  }

  initApp = () => {
    this.questionnaireService.getStructure().then((structure: any) => {
      this.questionnaireStructure = structure;
      this.translations = structure.translations[structure.language_id];
      this.formErrorService.init(this.translations.messages);
    }, (err) => {
      this.questionnaireService = null;
    });
  }

  start = () => {
    this.phase = 1;
    if (!this.questionnaire) {
      this.questionnaire = new Questionnaire(this.questionnaireStructure.questionblocks[0].questions);
    }
  }

  changePhase = (event) => {
    this.phase = event.phase;

    if (event.data) {
      this.end(event.data);
    }
  }

  end = (data) => {
    let outroWithValues = this.translations.outro.text;
    Object.entries(data).forEach(([key, value]) => {
      outroWithValues = outroWithValues.replace(`*|${key}|*`, value)
    })
    this.quizResponse = outroWithValues;
  }
}
