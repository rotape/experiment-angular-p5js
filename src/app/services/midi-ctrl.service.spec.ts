import { TestBed } from '@angular/core/testing';

import { MidiCtrlService } from './midi-ctrl.service';

describe('MidiCtrlService', () => {
  let service: MidiCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidiCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
