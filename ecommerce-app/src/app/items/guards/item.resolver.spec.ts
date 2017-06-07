import { TestBed, inject } from '@angular/core/testing';

import { ItemResolver } from './item.resolver';

import { ItemsService } from './../items.service';

describe('ItemResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemResolver,
        ItemsService
      ]
    });
  });

  it('should be created', inject([ItemResolver], (service: ItemResolver) => {
    expect(service).toBeTruthy();
  }));
});
