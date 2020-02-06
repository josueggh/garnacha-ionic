/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UtilService } from '../../../services/util/util.service';
import * as firebase from 'firebase';
import { AuthenticationService } from '../../../services/firestore/firebase-authentication.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any = '';
  public password: any = '';
  public number: any = '';
  public country_code: any = '';
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  showPhoneAuth: any = false;
  constructor(private platform: Platform, public loadingController: LoadingController, public alertController: AlertController, private splashScreen: SplashScreen, public util: UtilService, private menuCtrl: MenuController, private authServ: AuthenticationService) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.showPhoneAuth = this.platform.is('desktop') || this.platform.is('pwa')
    });
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

      },
      'expired-callback': () => {
      }
    });

  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  signin() {
    if (this.util.validateEmail(this.email) && this.password !== '') {
      this.util.openLoader();
      this.authServ.login(this.email, this.password).then(
        userData => {
          this.util.navigate('home', false);
          this.email = '';
          this.password = '';
          this.authServ.userData = userData;
        }
      ).catch(err => {
        if (err) {
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
        }

      }).then(el => this.util.closeLoading());
    } else {
      this.util.presentToast('Please enter email and password', true, 'bottom', 2100);
    }
  }
  signInAnonymously() {
    this.util.openLoader();
    this.authServ.signInAnonymously().then(
      userData => {
        this.util.navigate('home', false);
      }
    ).catch(err => {
      if (err) {
        this.util.presentToast(`${err}`, true, 'bottom', 2100);
      }

    }).then(el => this.util.closeLoading());
  }
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Email',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name1',
          type: 'email',
          placeholder: 'Enter your email',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (res) => {
          }
        }, {
          text: 'Ok',
          handler: (res) => {
            const value = this.util.validateEmail(res.name1);
            this.authServ.forgotPassoword(res.name1);
            return value;
          }
        }
      ]
    });
    await alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authServ.enterVerificationCode(res.otp).then(
            userData => {
              this.util.navigate('home', false);
            }
          ).catch(err => {
            if (err) {
              this.util.presentToast(`${err}`, true, 'bottom', 2100);
            }
          }).then(el => this.util.closeLoading());
        }
      }
      ]
    });
    await alert.present();
  }
  githubLogin() { }
  facebookLogin($event) {
    if ($event === 'browser') {
      this.authServ.fbLogin().then(
        succes => {
          this.authServ.createSocialLoginUser(succes.user);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      );
    } else {
      this.authServ.loginWithFacebook($event).then(
        succes => {
          this.authServ.createSocialLoginUser(succes);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      )
    }
  }
  twitterLogin($event) {
    if ($event.isBrowser) {
      this.authServ.twitterLogin().then(
        succes => {
          this.authServ.createSocialLoginUser(succes.user);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      );
    } else {
      this.authServ.loginWithTwitter($event.token, $event.secret).then(
        succes => {
          this.authServ.createSocialLoginUser(succes);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      )
    };
  }

  googleLogin($event) {
    if ($event.isBrowser) {
      this.authServ.googleLogin().then(
        succes => {
          this.authServ.createSocialLoginUser(succes.user);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      );
    } else {
      this.authServ.loginWithGoogle($event.idToken, $event.accessToken).then(
        succes => {
          this.authServ.createSocialLoginUser(succes);
          this.util.navigate('home', false);
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      );
    }
  }
  contryCodeChange($event) {
    this.country_code = $event.detail.value
  }
  signinWithPhoneNumber($event) {
    if (this.number && this.country_code) {
      this.authServ.signInWithPhoneNumber(this.recaptchaVerifier, this.country_code + this.number).then(
        succes => {
          this.OtpVerification();
        }
      ).catch(
        err => {
          this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
        }
      )
    } else {
      this.util.presentToast('Contact number and code both are required field', true, 'bottom', 2100);
    }
  }
}
