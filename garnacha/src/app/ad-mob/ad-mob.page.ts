/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, OnInit } from '@angular/core';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ad-mob',
  templateUrl: './ad-mob.page.html',
  styleUrls: ['./ad-mob.page.scss'],
})
export class AdMobPage implements OnInit {
  adMobId = {
    android :{
      banner: 'ca-app-pub-3940256099942544/6300978111', // replace with your adMob ID
      interstitial: 'ca-app-pub-3940256099942544/1033173712', // replace with your adMob ID
      interstitialVideo: 'ca-app-pub-3940256099942544/8691691433', // replace with your adMob ID
      reward: 'ca-app-pub-3940256099942544/5224354917' // replace with your adMob ID
    },
    ios :{
      banner: 'ca-app-pub-3940256099942544/2934735716',  // replace with your adMob ID
      interstitial: 'ca-app-pub-3940256099942544/4411468910', // replace with your adMob ID
      interstitialVideo: 'ca-app-pub-3940256099942544/5135589807', // replace with your adMob ID
      reward: 'ca-app-pub-3940256099942544/1712485313' // replace with your adMob ID
    }
  }
  constructor(public alertController: AlertController,
    private admob: AdMobPro,
    private platform: Platform) {
  }
  ngOnInit() {

  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Ad dismissed',
      subHeader: data.adType,
      message: 'You dismissed the ' + data.adType + ' ad from ' + data.adNetwork,
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.admob.onAdDismiss()
      .subscribe((data) => {
        this.presentAlert(data)
      });
  }

  banner() {
    let adId;
    if (this.platform.is('android')) {
      adId = this.adMobId.android.banner;
    } else if (this.platform.is('ios')) {
      adId = this.adMobId.ios.banner;
    }
    this.admob.createBanner({
      adId: adId,
      isTesting: true // remove in production 
    })
      .then(() => {
        this.admob.showBanner(this.admob.AD_POSITION.BOTTOM_CENTER);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  hideBanner() {
    this.admob.hideBanner();
  }

  interstitial() {
    let adId;
    if (this.platform.is('android')) {
      adId = this.adMobId.android.interstitial;
    } else if (this.platform.is('ios')) {
      adId = this.adMobId.ios.interstitial;
    }
    this.admob.prepareInterstitial({
      adId: adId,
      isTesting: true // remove in production 
    })
      .then(() => {
        this.admob.showInterstitial();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  reward() {
    let adId;
    if (this.platform.is('android')) {
      adId = this.adMobId.android.reward;
    } else if (this.platform.is('ios')) {
      adId = this.adMobId.ios.reward;
    }
    this.admob.prepareRewardVideoAd({
      adId: adId,
      isTesting: true // remove in production 
    })
      .then(() => {
        this.admob.showRewardVideoAd();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  interstitialVideo() {
    let adId;
    if (this.platform.is('android')) {
      adId = this.adMobId.android.interstitialVideo;
    } else if (this.platform.is('ios')) {
      adId = this.adMobId.ios.interstitialVideo;
    }
    this.admob.prepareInterstitial({
      adId: adId,
      isTesting: true // remove in production 
    })
      .then(() => {
        this.admob.showInterstitial();
      })
      .catch((err) => {
        console.log(err)
      });
  }

}
