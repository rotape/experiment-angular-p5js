import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAudioComponentComponent } from './web-audio-component.component';

describe('WebAudioComponentComponent', () => {
  let component: WebAudioComponentComponent;
  let fixture: ComponentFixture<WebAudioComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAudioComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAudioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
