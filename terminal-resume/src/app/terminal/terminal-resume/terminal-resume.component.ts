import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { GITHUB_USER_LOGO, PROMPT, TERMINAL_DESCRIPTION, TerminalCharacters, TerminalEventKeys } from 'src/constants/constants';
import { WebLinksAddon } from 'xterm-addon-web-links';

@Component({
  selector: 'app-terminal-resume',
  templateUrl: './terminal-resume.component.html',
  styleUrls: ['./terminal-resume.component.scss']
})
export class TerminalResumeComponent implements AfterViewInit{
  @ViewChild('terminal', {static: false}) terminal?: NgTerminal;

  /** Used to track current input line. */
  line: string[] = [];
  
  ngAfterViewInit() {
    this.terminal?.underlying?.loadAddon(new WebLinksAddon());
    this.terminal?.setStyle({
      padding: '24px',
    });
    this.terminal?.setXtermOptions({
      allowTransparency: true,
      convertEol: true, // Sets new line exactly on the beginning.
      cursorBlink: true,
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: {
        background: '#096136',
      },
      windowOptions: {
        fullscreenWin: true, // Allow to use F11.
      },
    });

    this.writeBootSequence();
    
    this.terminal?.onKey().subscribe(({domEvent}: {domEvent: KeyboardEvent}) => {
      const isKeyPrintable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
      const key = domEvent.key;
      switch(key) {
        case TerminalEventKeys.Enter:
          this.terminal?.write('\n');
          this.handleCommand(this.line.join(''));
          this.line = [];
          this.terminal?.write(PROMPT);
          break;
        case TerminalEventKeys.Backspace:
          // Prevents from removing prompt.
          if (this.terminal?.underlying?.buffer?.active?.cursorX && this.terminal?.underlying?.buffer?.active?.cursorX > 2) {
            this.terminal?.write(`${TerminalCharacters.Back} ${TerminalCharacters.Back}`);
            this.line.pop();
          }
          break;
        default:
          if(isKeyPrintable) {
            this.terminal?.write(key);
            this.line.push(key);
          }
      }
    });
  }

  writeBootSequence() {
    this.terminal?.write(GITHUB_USER_LOGO);
    this.terminal?.write('\n');
    this.terminal?.write(TERMINAL_DESCRIPTION);
    this.terminal?.write('\n');
    this.terminal?.write(PROMPT);
  }

  writeLn(line: string) {
    this.terminal?.write(line + '\r\n');
  }

  async handleCommand(command: string) {
    const [cmd, ...args] = command.replace(/\s+/, ' ').split(' ');
    switch(cmd) {
      case 'clear':
        this.terminal?.underlying?.clear();
        break;
      case 'help':
        this.writeLn('clear - Cleans terminal.');
        break;
      default:
        this.writeLn(`${cmd} command not found, type \x1b[1mhelp\x1b[0m to get list of commends.`);
    }
  }
}
