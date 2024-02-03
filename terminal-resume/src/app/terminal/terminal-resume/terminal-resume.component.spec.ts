import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalResumeComponent } from './terminal-resume.component';

describe('TerminalResumeComponent', () => {
  let component: TerminalResumeComponent;
  let fixture: ComponentFixture<TerminalResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminalResumeComponent]
    });
    fixture = TestBed.createComponent(TerminalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
