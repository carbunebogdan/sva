import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IntroScreenComponent } from './components/intro-screen/intro-screen.component';
import { OutroScreenComponent } from './components/outro-screen/outro-screen.component';


@NgModule({
  declarations: [IntroScreenComponent, OutroScreenComponent],
  exports: [IntroScreenComponent, OutroScreenComponent, CommonModule],
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class CoreModule { }
