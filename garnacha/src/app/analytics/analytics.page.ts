/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, OnInit } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { UtilService } from '../services/util/util.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  event: any = '';
  constructor(public UtilService: UtilService, private firebaseAnalytics: FirebaseAnalytics) {
    this.firebaseAnalytics.logEvent('page_view', { page: 'analyticspage' })
      .then((res: any) => {})
      .catch((error: any) => console.error(error));
  }
  addPageView(eventCustom) {
    this.firebaseAnalytics.logEvent('page_view', { page: eventCustom })
      .then((res: any) =>{})
      .catch((error: any) => console.error(error));
    this.UtilService.presentToast('Page view tracked successfully', true, 'bottom', 2100);
  }
  ngOnInit() {
  }
}
