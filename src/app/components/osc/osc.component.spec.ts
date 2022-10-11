import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscComponent } from './osc.component';

describe('OscComponent', () => {
  let component: OscComponent;
  let fixture: ComponentFixture<OscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
