import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalResumeComponent } from './terminal-resume/terminal-resume.component';



@NgModule({
  declarations: [
    TerminalResumeComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TerminalResumeComponent,
  ],
})
export class TerminalModule { }
