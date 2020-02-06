/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { UtilService } from '../services/util/util.service';
import { AuthenticationService } from '../services/firestore/firebase-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {

  constructor(private authServ: AuthenticationService, private util: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot):any {
    return this.authServ.checkAuth().then(user =>{
      if(user){
        return true;
      } else{
        this.util.navigate('login',true);
      }
    })
  }
}
