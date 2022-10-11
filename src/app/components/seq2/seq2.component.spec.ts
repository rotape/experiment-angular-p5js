import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seq2Component } from './seq2.component';

describe('Seq2Component', () => {
  let component: Seq2Component;
  let fixture: ComponentFixture<Seq2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Seq2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seq2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
