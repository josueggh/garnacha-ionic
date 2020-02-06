/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, OnInit } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { UtilService } from '../services/util/util.service';
@Component({
  selector: 'app-crash-lytics',
  templateUrl: './crash-lytics.page.html',
  styleUrls: ['./crash-lytics.page.scss'],
})
export class CrashLyticsPage implements OnInit {
  event: any = ''
  constructor(public UtilService:UtilService, private firebaseCrashlytics: FirebaseCrashlytics) {
    const crashlytics = this.firebaseCrashlytics.initialise();
    crashlytics.logException('my caught exception');
  }
  addException(customEvent) {
    const crashlytics = this.firebaseCrashlytics.initialise();
    const result = crashlytics.logException(customEvent);
    this.UtilService.presentToast('Your Exception Tracked successfully', true, 'bottom', 2100);
  }
  ngOnInit() {
  }
}
