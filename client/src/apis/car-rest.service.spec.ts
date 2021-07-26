import { TestBed } from '@angular/core/testing';

import { CarRestService } from './car-rest.service';

describe('CarRestService', () => {
  let service: CarRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
