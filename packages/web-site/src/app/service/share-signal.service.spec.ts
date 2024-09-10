import { TestBed } from '@angular/core/testing';

import { ShareSignalService } from './share-signal.service';

describe('ShareSignalService', () => {
  let service: ShareSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
