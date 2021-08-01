import { TestBed } from '@angular/core/testing';

import { CarRest } from './car-rest';

describe('CarRest', () => {
  let service: CarRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
