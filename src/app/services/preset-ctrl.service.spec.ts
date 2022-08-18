import { TestBed } from '@angular/core/testing';

import { PresetCtrlService } from './preset-ctrl.service';

describe('PresetCtrlService', () => {
  let service: PresetCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresetCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
