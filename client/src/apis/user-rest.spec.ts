import { TestBed } from '@angular/core/testing';

import { UserRest } from './user-rest';

describe('UserRest', () => {
  let service: UserRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
