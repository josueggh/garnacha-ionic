/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 

import { TestBed } from '@angular/core/testing';

import { utilService } from './util.service';

describe('utilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: utilService = TestBed.get(utilService);
    expect(service).toBeTruthy();
  });
});
