import { TestBed } from '@angular/core/testing';

import { NavbarService } from '../Services/navbar.service';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
