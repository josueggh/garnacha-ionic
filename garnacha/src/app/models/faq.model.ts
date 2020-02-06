/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class FAQModel extends BaseDatabaseModel {
   public question:string;
   public answer:string;
   public uid: string;
   public tag: string;

    constructor(id: string, question: string, answer: string, uid: string, tag: string) {
        super();
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.uid = uid;
        this.tag = tag;
    }
    public toDto(): FAQDto {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            uid: this.uid,
            tag: this.tag
        };
    }

    public emptySurvey(): FAQModel {
        return new FAQModel(UUID.UUID(),null, null, null,null);
    }
}



export interface FAQDto extends BaseDto {
    question: string,
    answer:string,
    uid: string,
    tag: string
}
