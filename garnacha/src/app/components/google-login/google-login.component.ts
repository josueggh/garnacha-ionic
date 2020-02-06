/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {

  @Output() accessToken = new EventEmitter<{ idToken?: string, accessToken?: string, isBrowser?: boolean }>();

  constructor(private platform: Platform, private google: GooglePlus) { }

  ngOnInit() { }
  doLogin() {
    let params;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          'webClientId': '124018728460-sv8cqhnnmnf0jeqbnd0apqbnu6egkhug.apps.googleusercontent.com',
          'offline': true
        }
      } else {
        params = {};
      }
      this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response
          this.accessToken.next({ idToken, accessToken });
        }).catch((error) => {
          alert('error:' + JSON.stringify(error));
        });
    } else {
      this.accessToken.next({ isBrowser: true });
    }
  }
}
