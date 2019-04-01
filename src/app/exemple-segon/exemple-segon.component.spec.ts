import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleSegonComponent } from './exemple-segon.component';

describe('ExempleSegonComponent', () => {
  let component: ExempleSegonComponent;
  let fixture: ComponentFixture<ExempleSegonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExempleSegonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempleSegonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
