/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Injectable } from '@angular/core';
// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirestoreService } from './firestore.service'

@Injectable()
export class StorageService {
    constructor(private storage: AngularFireStorage, private baseFs: FirestoreService) {
    }
    public uploadContent(file: any,fileName: any  ): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (file) {
                    return this.storage.upload(`uploads/${fileName}`, file).then(
                        success => {
                            return this.storage.ref(`uploads/${fileName}`).getDownloadURL().subscribe(url => {
                                return this.baseFs.uploadFile('uploads',url,fileName)
                                    .then(() => {
                                        resolve({ url: url,fileName: fileName });
                                    })
                                    .catch(err => {
                                      
                                        reject(err);
                                })
                            });
                        },
                        failure => {
                           
                            reject(failure);
                        }
                    )
                        .catch(err => {
                          
                            reject(err);
                        })
                } else {
                    reject(new Error(' choice key not given'));
                }
            } catch (e) {
                reject(e);
            }

        })
    }
}
