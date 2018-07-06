import { TestBed, inject } from '@angular/core/testing';

import { Pagerservice } from './pagerservice';

describe('Pagerservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pagerservice]
    });
  });

  it('should be created', inject([Pagerservice], (service: Pagerservice) => {
    expect(service).toBeTruthy();
  }));
});
