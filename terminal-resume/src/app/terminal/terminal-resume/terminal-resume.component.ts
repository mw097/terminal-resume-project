import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { BehaviorSubject, Subject, takeUntil, combineLatestWith } from 'rxjs';
import { GITHUB_USER_LOGO, PROMPT, TERMINAL_DESCRIPTION, TerminalCharacters, TerminalEventKeys } from 'src/constants/constants';
import { WebLinksAddon } from 'xterm-addon-web-links';

@Component({
  selector: 'app-terminal-resume',
  templateUrl: './terminal-resume.component.html',
  styleUrls: ['./terminal-resume.component.scss']
})
export class TerminalResumeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('terminal', {static: false}) terminal?: NgTerminal;

  private readonly isTerminalLocked$ = new BehaviorSubject<boolean>(false);
  private readonly destroy$ = new Subject<void>();
  /** Used to track current input line. */
  line: string[] = [];
  
  ngAfterViewInit() {
    this.terminal?.underlying?.loadAddon(new WebLinksAddon());
    this.terminal?.setStyle({
      padding: '24px',
      textShadow: '0 0.2rem 1rem #12ba66',
    });
    this.terminal?.setXtermOptions({
      allowTransparency: true,
      convertEol: true, // Sets new line exactly on the beginning.
      cursorBlink: true,
      fontFamily: '"VT323", monospace',
      fontSize: 24,
      theme: {
        background: '#095d33',
      },
      windowOptions: {
        fullscreenWin: true, // Allow to use F11.
      },
    });

    this.writeBootSequence();
    
    this.terminal?.onKey()
      .pipe(
        combineLatestWith(this.isTerminalLocked$),
        takeUntil(this.destroy$)
        )
      .subscribe(([{domEvent}, isTerminalLocked]: [{domEvent: KeyboardEvent}, boolean]) => {
        if (!isTerminalLocked) {
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
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async pause(nanoseconds: number) {
    return new Promise(resolve => setTimeout(resolve, nanoseconds));
  }

  async writeBootSequence() {
    this.isTerminalLocked$.next(true);
    this.terminal?.underlying?.clear();
    this.terminal?.write(GITHUB_USER_LOGO);
    this.terminal?.write('\n');
    await this.writeAsync(TERMINAL_DESCRIPTION);
    this.terminal?.write('\n \n');
    this.terminal?.write(PROMPT);
    this.isTerminalLocked$.next(false);
  }

  writeLn(line: string) {
    this.terminal?.write(line + '\r\n');
  }

  async writeAsync(text: string) {
    const queue = text.split('');
    await this.pause(1000);

    for (const sign of queue) {
      this.terminal?.write(sign);
      await this.pause(50);
    }
    await this.pause(500);
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
