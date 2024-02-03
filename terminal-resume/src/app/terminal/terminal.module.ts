import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalResumeComponent } from './terminal-resume/terminal-resume.component';
import { NgTerminalModule } from 'ng-terminal';


@NgModule({
  declarations: [
    TerminalResumeComponent,
  ],
  imports: [
    CommonModule,
    NgTerminalModule,
  ],
  exports: [
    TerminalResumeComponent,
  ],
})
export class TerminalModule { }
