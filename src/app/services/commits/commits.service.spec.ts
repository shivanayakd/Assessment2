import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommitsService } from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CommitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
