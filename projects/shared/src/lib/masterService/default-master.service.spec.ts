import { TestBed } from '@angular/core/testing';

import { DefaultMasterService } from './default-master.service';

describe('DefaultMasterService', () => {
  let service: DefaultMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
