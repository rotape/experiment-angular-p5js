import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeqComponent } from './seq.component';

describe('SeqComponent', () => {
  let component: SeqComponent;
  let fixture: ComponentFixture<SeqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
