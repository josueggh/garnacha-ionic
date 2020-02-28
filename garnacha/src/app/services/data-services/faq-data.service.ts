/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FAQDto } from '../../models/faq.model';
import { FirestoreService } from '../firestore/firestore.service';
import { UtilService } from '../util/util.service';


@Injectable()
export class FAQDataService extends BaseDataService<FAQDto> {
    constructor(private firestore: FirestoreService, private util: UtilService) {
        super('faq');
    }
}