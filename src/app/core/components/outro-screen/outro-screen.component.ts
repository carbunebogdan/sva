import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-outro-screen',
  templateUrl: './outro-screen.component.html',
  styleUrls: ['./outro-screen.component.scss']
})
export class OutroScreenComponent implements OnInit {
  @Input() data;
  @Input() translations;

  quizResponse;

  constructor() { }

  ngOnInit(): void {
    this.quizResponse = this.processQuestionnaireData(this.data);
  }

  processQuestionnaireData = (data) => {
    // search tokens in outro translation text from api and replace those with the correct object property
    return Object.entries(data).reduce((processedText, [key, value]) => {
      processedText = processedText.replace(`*|${key}|*`, value || '')
      return processedText
    }, this.translations.outro.text);
  }

}
