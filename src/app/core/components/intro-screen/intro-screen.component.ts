import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro-screen',
  templateUrl: './intro-screen.component.html',
  styleUrls: ['./intro-screen.component.scss']
})
export class IntroScreenComponent implements OnInit {
  @Input() design;
  @Input() translations;

  @Output() onStart = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
