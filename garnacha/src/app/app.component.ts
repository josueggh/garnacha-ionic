/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/firestore/firebase-authentication.service';
import { UtilService } from './services/util/util.service';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app-component.scss']
})
export class AppComponent {

  public appMenu = [
    { title: 'Data operation', url: '/ad-mob', icon: 'help' },
    { title: 'Storage', url: '/images', icon: 'images' },
    { title: 'Ad Mob', url: '/ad-mob', icon: 'mail-unread' },
    { title: 'Crashlytics', url: '/crash-lytics', icon: 'bug' },
    { title: 'Analytics', url: '/analytics', icon: 'analytics' }

  ];

  constructor(
    private authService: AuthenticationService,
    private util: UtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAnalytics: FirebaseAnalytics
  ) {
    this.initializeApp();
  }
  logout() {
    this.authService.logout().then(() => {
      this.util.navigate('login', false);

    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebaseAnalytics.logEvent('page_view', { page: 'dashboard' })
        .then((res: any) => {})
        .catch((error: any) => console.error(error));
    });
  }
}
