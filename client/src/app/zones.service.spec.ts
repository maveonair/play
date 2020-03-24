import {TestBed} from '@angular/core/testing';

import {ZonesService} from './zones.service';
import {HttpClientModule} from "@angular/common/http";

describe('ZonesService', () => {
  let service: ZonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ZonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
