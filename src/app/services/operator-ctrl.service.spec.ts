import { TestBed } from '@angular/core/testing';

import { OperatorCtrlService } from './operator-ctrl.service';

describe('OperatorCtrlService', () => {
  let service: OperatorCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
