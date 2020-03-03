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
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app-component.scss']
})
export class AppComponent {

  public appPages = [
   // { title: 'Our Store', url: 'https://www.kichink.com/stores/larutadelagarnacha/', icon: 'basket' },
    { title: 'Rewards', url: '/rewards', icon: 'trophy' },
    { title: 'Youtube', url: '/ad-mob', icon: 'logo-youtube' },
    { title: 'Contact', url: '/contact', icon: 'paper-plane' },
  ];

  textDir = 'ltr';

  constructor(
    private authService: AuthenticationService,
    private util: UtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAnalytics: FirebaseAnalytics,
    public translate: TranslateService
  ) {
    this.initializeApp();
    this.setLanguage();
  }
  logout() {
    this.authService.logout().then(() => {
      this.util.navigate('app', false);

    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if( this.platform.is('ios') || this.platform.is('android') ){
        this.firebaseAnalytics.logEvent('page_view', { page: 'dashboard' })
          .then((res: any) => {})
          .catch((error: any) => console.error(error));
      }
    });
  }

  setLanguage() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
