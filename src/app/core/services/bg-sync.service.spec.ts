import { TestBed } from '@angular/core/testing';

import { BgSyncService } from './bg-sync.service';

describe('BgSyncService', () => {
  let service: BgSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
