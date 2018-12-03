import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplePrimerComponent } from './exemple-primer.component';

describe('ExemplePrimerComponent', () => {
  let component: ExemplePrimerComponent;
  let fixture: ComponentFixture<ExemplePrimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemplePrimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplePrimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
