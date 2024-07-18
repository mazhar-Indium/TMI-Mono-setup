import { TestBed } from '@angular/core/testing';

import { AppInitServiceTsService } from './app-init.service.ts.service';

describe('AppInitServiceTsService', () => {
  let service: AppInitServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
