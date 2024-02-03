import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { GITHUB_USER_LOGO, PROMPT, TERMINAL_DESCRIPTION, TerminalCharacters } from 'src/constants/constants';

@Component({
  selector: 'app-terminal-resume',
  templateUrl: './terminal-resume.component.html',
  styleUrls: ['./terminal-resume.component.scss']
})
export class TerminalResumeComponent implements AfterViewInit{
  @ViewChild('terminal', {static: false}) terminal?: NgTerminal;
  
  ngAfterViewInit() {
    this.terminal?.setXtermOptions({
      allowTransparency: true,
      convertEol: true, // Sets new line exactly on the beginning.
      cursorBlink: true,
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: {
        background: '#096136'
      },
      windowOptions: {
        fullscreenWin: true, // Allow to use F11.
      },
    });

    this.printBootSequence();
    
    this.terminal?.onData().subscribe((input: string) => {
      switch(input) {
        case TerminalCharacters.Return:
          this.terminal?.write('\n');
          this.terminal?.write(PROMPT);
          break;
        case TerminalCharacters.Backspace:
          if (this.terminal?.underlying?.buffer?.active?.cursorX && this.terminal?.underlying?.buffer?.active?.cursorX > 2) {
            this.terminal?.write(`${TerminalCharacters.Back} ${TerminalCharacters.Back}`);
          }
          break;
        case TerminalCharacters.CtrlC:
          this.terminal?.write('^C');
          this.terminal?.write(PROMPT);
          break;
        default:
          this.terminal?.write(input);
      }
    });
  }

  printBootSequence() {
    this.terminal?.write(GITHUB_USER_LOGO);
    this.terminal?.write('\n');
    this.terminal?.write(TERMINAL_DESCRIPTION);
    this.terminal?.write('\n');
    this.terminal?.write(PROMPT);
  }
}
