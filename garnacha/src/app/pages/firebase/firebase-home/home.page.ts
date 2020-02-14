/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Component, ViewChild } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FAQDataService } from '../../../services/data-services/faq-data.service';
import { AuthenticationService } from '../../../services/firestore/firebase-authentication.service';
import { UtilService } from '../../../services/util/util.service';
import { MenuController, IonContent } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { BusinessService } from 'src/app/services/data-services/business.service';
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
export class HomePage {
  @ViewChild('content') content: IonContent
  public questionList: Array<FAQDto>;
  public newFaq: FAQDto;
  public isUpdate: boolean;
  public uid: string;
  public filtertag: string;
  customAlertOptions: any = {
    header: 'Filter',
  };
  constructor(private faqDataServ: FAQDataService,
    private businessServ : BusinessService,
    private firestoreServ: FirestoreService, 
    private authService: AuthenticationService, private util: UtilService, private menuCtrl: MenuController) {
      
     // this.businessServ.getAll().subscribe(businessList => {
     //   console.log(businessList);
     // });

      //this.businessServ.getFirstOrderBy({field: 'rate', order :'desc'}).subscribe(businessList => {
     ///    console.log(businessList);
     // });
     // this.businessServ.getRandom(2).subscribe(businessList => {
     //  console.log(businessList)
     // });
      this.businessServ.getByTag("Zonas Godin", {field: 'rate', order:'desc'}).subscribe(businessList => {
      console.log(businessList)
     });
    // this.util.userid.subscribe(data => {

    //   this.uid = data;

     
    //   this.faqDataServ.get().subscribe(questionList => {

    //     this.questionList = questionList
    //   })
    // })

  }
  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
    //this.content.scrollToTop(300);

  }
  scroll() {
    //this.content.scrollToTop(300);
  }

}
