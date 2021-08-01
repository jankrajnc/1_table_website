import { TestBed } from '@angular/core/testing';

import { AuthUtil } from './auth-util';

describe('AuthUtilService', () => {
  let service: AuthUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
