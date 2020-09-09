import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, MultiselectQuestion, SelectQuestion, OpenQuestion, FormQuestion } from '../../obj/question.class';
import { FormErrorService } from '../../services/form-error/form-error.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Input() data;
  @Input() rules;
  @Input() design;
  @Input() nextButtonLabel;
  @Output() onPhaseEnd = new EventEmitter<any>();

  subPhase = 0; //alias current question index

  questions: Question[];

  constructor(private formErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.questions = this.parseQuestions(this.data.questions);
  }

  parseQuestions = (questions): Question[] => {
    let parsed: Question[] = [];
    questions.forEach(question => {
      let questionType
      // check question type
      if (question.type.object_name == "text_choice") {
        questionType = question.type.params['1']?.type?.filter(obj => obj.key == "type")[0].value;
      } else {
        questionType = question.type?.object_name;
      }

      // depending on its type, create the proper class instance for a question
      switch (questionType) {
        case "multiple":
          parsed.push(new MultiselectQuestion(question));
          break
        case "single":
          parsed.push(new SelectQuestion(question));
          break
        case "open_end":
          parsed.push(new OpenQuestion(question));
          break
        case "form":
          parsed.push(new FormQuestion(question));
          break
        default:
          console.log('unknown type');
      }
    });
    return parsed;
  }

  changeSubPhase = (a) => {// a = increment or decrement
    if (this.subPhase == 0 && a < 0) {
      this.onPhaseEnd.emit({ phase: 0 }); //go to intro
    } else {
      if (this.isQuestionValid(this.questions[this.subPhase]) && a > 0) {
        if (this.subPhase == (this.data.questions.length - 1)) {
          this.onPhaseEnd.emit({ phase: 2, data: this.formatResponseData(this.questions) }); //go to outro
          return
        }
        // go to next question
        this.subPhase += a;
        this.checkRules();
        if (this.questions[this.subPhase].hidden) {
          // skip current question if is disabled
          this.changeSubPhase(1);
        }
      } else if (a < 0) {
        // if we step backwards there is no need to check for errors
        this.subPhase += a;
      }
    }
  }

  isQuestionValid = (question): boolean => {
    // check for errors
    let validity = question.getValidity();
    // if there is an error, send it to form error service
    if (!validity.valid && validity.error)
      this.formErrorService.showError(validity);

    return validity.valid;
  }

  checkRules = () => {
    // basic implementation of the rules mechanism, this needs to be more generic..and fail proof

    this.rules.forEach((rule) => {
      let flag = true;
      rule.conditions.forEach((condition) => {
        let variable = this.questions.filter((q) => q.order == condition.variable.find[0].value && q.getValidity().valid)[0]?.getAnswer().order;
        if (!eval(`${variable}${condition.conditional_operator}${condition.value}`)) {
          flag = false;
        }
      })

      if (flag) {
        // condition is met
        rule.actions.forEach((action) => {
          action.content.forEach((questionNumber) => {
            if (action.do == "hide") {
              let index = this.questions.findIndex((q) => q.order == questionNumber);
              if (index > -1) {
                this.questions[index].hidden = true;
              }
            }
          })
        })
      } else {
        // condition is not met, reset the state
        rule.actions.forEach((action) => {
          action.content.forEach((questionNumber) => {
            if (action.do == "hide") {
              let index = this.questions.findIndex((q) => q.order == questionNumber);
              if (index > -1) {
                this.questions[index].hidden = false;
              }
            }
          })
        })
      }
    });
  }

  // aggregate all question responses into one object, each property represents a question answer
  formatResponseData = (questions) => {
    return questions.reduce((obj, q) => (obj = { ...obj, ...q.getData() }, obj), {})
  }
}
