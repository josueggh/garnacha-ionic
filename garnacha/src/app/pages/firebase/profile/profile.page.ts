/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util/util.service';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/firestore/firebase-authentication.service';

import {UserDto , emptyUser} from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: [
    './styles/user-profile.page.scss',
    './styles/user-profile.shell.scss',
    './styles/user-profile.ios.scss',
    './styles/user-profile.md.scss'
  ],
})
export class ProfilePage implements OnInit {

  fullProfile : any;

  constructor(public util: UtilService, private menuCtrl: MenuController, private authServ: AuthenticationService) {
    this.fullProfile =  Object.assign({}, emptyUser);
    authServ.authInfo$.subscribe( data =>{
      if(data.$uid){
        this.fullProfile = data;
        console.log(data);
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //this.menuCtrl.enable(true, 'start');
    //this.menuCtrl.enable(true, 'end');
  }

}
