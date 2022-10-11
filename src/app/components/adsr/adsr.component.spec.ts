import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsrComponent } from './adsr.component';

describe('AdsrComponent', () => {
  let component: AdsrComponent;
  let fixture: ComponentFixture<AdsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
