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
  constructor(private faqDataServ: FAQDataService, private firestoreServ: FirestoreService, private authService: AuthenticationService, private util: UtilService, private menuCtrl: MenuController) {
    this.newFaq = this.newQuestion();
    this.util.userid.subscribe(data => {

      this.uid = data;
      this.faqDataServ.get().subscribe(questionList => {

        this.questionList = questionList
      })
    })

  }
  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
    this.content.scrollToTop(300);

  }
  scroll() {
    this.content.scrollToTop(300);
  }
  addQuestionToDB() {
    this.newFaq.uid = this.uid;
    if (this.newFaq.question.trim().length && this.newFaq.answer.trim().length && this.newFaq.tag.trim().length) {
      this.faqDataServ.create(this.newFaq).then(
        _ => {
        this.newFaq = this.newQuestion()
          this.util.presentToast('question Added', true, 'bottom', 2100);
        }
      ).catch(err => {


      })
    } else {
      this.util.presentToast('Please Fill Fields', true, 'bottom', 2100)
    }
  }
  newQuestion() {
    this.isUpdate = false;
    return {
      id: UUID.UUID(),
      question: '',
      answer: '',
      uid: this.uid,
      tag: ''
    }
  }
  editQuestion(questionId: string) {
    this.faqDataServ.getOne(questionId).subscribe(
      questionData => {
        this.newFaq = questionData;
        this.isUpdate = true;
      }
    )
  }
  updateQuestion() {
    if (this.newFaq.question.trim().length && this.newFaq.answer.trim().length && this.newFaq.tag.trim().length) {
      this.faqDataServ.update(this.newFaq).then(
        _ => {
        this.newFaq = this.newQuestion()
          this.util.presentToast('UPDATED', true, 'bottom', 2100);
        }
      ).catch(err => { })
    }
  }
  cancelUpdate() {
    this.newFaq = this.newQuestion();
    this.isUpdate = false;
  }
  alertFilter() {
    document.getElementById('filterSelect').click();
  }
  tagValue(name) {

  }
  headTagValue(filtername) {
    const filter = this.questionList.filter(item => item.tag === filtername);

  }
  deleteQuestion(id) {
    this.util.removeConform().then(res => {
      if (res === 'ok'){
        this.faqDataServ.delete(id).then(success => this.util.presentToast('Item is deleted', null, null, 3000))
      }
    })
  }

}
