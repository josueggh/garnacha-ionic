/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, ViewChild, OnInit  } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FAQDataService } from '../../../services/data-services/faq-data.service';
import { AuthenticationService } from '../../../services/firestore/firebase-authentication.service';
import { UtilService } from '../../../services/util/util.service';
import { MenuController, IonContent } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { BusinessService } from 'src/app/services/data-services/business.service';
import { ListService } from 'src/app/services/data-services/list.service';
import { List } from '../../../models/list.model'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

export interface FAQDto {
  question: string,
  id: string;
  answer: string,
  uid: string,
  tag: string
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public questionList: Array<FAQDto>;
  public newFaq: FAQDto;
  public isUpdate: boolean;
  public uid: string;
  public locationAllowed : boolean; 
  public geoList: List;
  public filtertag: string;
  
  public lists: Array<List> = [];
  customAlertOptions: any = {
    header: 'Filter',
  };
  constructor(private faqDataServ: FAQDataService,
    private businessServ : BusinessService,
    private firestoreServ: FirestoreService, 
    private authService: AuthenticationService, 
    private util: UtilService, 
    private listService: ListService,
    private geoLocation : Geolocation,
    private platform: Platform,
    private menuCtrl: MenuController) {
      
      this.listService.getAll().subscribe( lists => {
        this.lists = lists;
      });  
  }

  ngOnInit(){
    this.platform.ready().then( () => {
      this.geoLocation.getCurrentPosition().then( locationResponse => { 
        this.locationAllowed = true;
        this.geoList = { 
          active: true,
          type: 'bylocation',
          icon: 'globe',
          name : 'Near you',
          id: 'bylocation',
          lat: locationResponse.coords.latitude,
          lng: locationResponse.coords.longitude
        };
      });
    });
  }
  
  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');

  }

}
