/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationService } from './services/firestore/firebase-authentication.service';
import { UserDataService } from './services/data-services/user-data.service';

import { FirestoreService } from './services/firestore/firestore.service';
import { FAQDataService } from './services/data-services/faq-data.service';
import { StorageService } from './services/firestore/filestorage.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UtilService } from './services/util/util.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

import { SharableModule } from './components/sharable.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    SharableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    UserDataService,
    FirestoreService,
    FAQDataService,
    FirebaseAnalytics,
    StorageService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    UtilService,
    TwitterConnect,
    GooglePlus,
    AdMobPro,
    FirebaseCrashlytics,
    Camera,
    Facebook,
    { provide: FirestoreSettingsToken, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
