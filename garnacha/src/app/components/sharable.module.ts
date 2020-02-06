/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { TwitterLoginComponent } from './twitter-login/twitter-login.component';
import { GoogleLoginComponent } from './google-login/google-login.component';

@NgModule({
    declarations: [FacebookLoginComponent, TwitterLoginComponent, GoogleLoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [FacebookLoginComponent, TwitterLoginComponent, GoogleLoginComponent]
})
export class SharableModule { }