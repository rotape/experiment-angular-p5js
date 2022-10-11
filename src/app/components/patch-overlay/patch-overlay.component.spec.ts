import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchOverlayComponent } from './patch-overlay.component';

describe('PatchOverlayComponent', () => {
  let component: PatchOverlayComponent;
  let fixture: ComponentFixture<PatchOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
