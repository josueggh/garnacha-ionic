/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UtilService } from '../util/util.service';
import * as firebase from 'firebase';

export class AuthInfo {
    constructor(public $uid: string, public $info: any) { }

    isLoggedIn() {
        return !!this.$uid;
    }
}

@Injectable()
export class AuthenticationService {
    static UNKNOWN_USER = new AuthInfo(null, null);
    recaptchaVerifier: any = {}
    confirmationResult: any = {};
    userData: any = {};
    loginType: string = ''
    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthenticationService.UNKNOWN_USER);

    constructor(private fireAuth: AngularFireAuth, private util: UtilService) {

        this.fireAuth.authState.pipe(
            take(1)
        ).subscribe(user => {
            if (user) {
                this.authInfo$.next(new AuthInfo(user.uid , user));
            }
        });

    }
    public forgotPassoword(email: string) {
        this.fireAuth.auth.sendPasswordResetEmail(email).then(() => {
            this.util.presentToast('Email Sent', true, 'bottom', 2100);
        }).catch(err => this.util.presentToast(`${err}`, true, 'bottom', 2100));

    }

    public createAccount(email: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    if (res.user) {
                        this.authInfo$.next(new AuthInfo(res.user.uid, res.user));
                        this.loginType = 'Login with Email and password';
                        resolve(res.user);
                    }
                })
                .catch(err => {
                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`creation failed ${err}`);
                });
        });
    }
    public signInAnonymously() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInAnonymously().then(() => {
                this.loginType = 'Login Anonymously';
                resolve();
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(`login failed ${error.message}`);
            });
        });
    }
    public getVerificationID(contact) {
        return new Promise<any>((resolve, reject) => {
            (<any>window).FirebasePlugin.getVerificationID(contact, id => {
                resolve(id);
            }, error => {
                reject(`login failed ${error}`);
            });
        });
    }
    public login(email: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.auth.signInWithEmailAndPassword(email, password)
                .then(res => {
                    if (res.user) {
                        this.loginType = 'Login with Email and password';
                        this.authInfo$.next(new AuthInfo(res.user.uid, res.user));
                        resolve(res.user);
                    }
                })
                .catch(err => {

                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`login failed ${err}`);
                });
        });
    }
    public githubLogin(accessToken) {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function () {
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // const token = result.credential.accessToken;
            // // The signed-in user info.
            // const user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    public logout(): Promise<void> {
        this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
        return this.fireAuth.auth.signOut();
    }
    public checkAuth() {
        return new Promise((resolve) => {
            this.fireAuth.auth.onAuthStateChanged(user => {
                this.userData = user;
                resolve(user);
            })
        })
    }
    public loginWithFacebook(accessToken) {
        this.loginType = 'Login with Facebook';
        const credential = firebase.auth.FacebookAuthProvider
            .credential(accessToken);
        return this.fireAuth.auth.signInWithCredential(credential);
    }
    public fbLogin(): Promise<any> {
        this.loginType = 'Login with Facebook';
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    public loginWithTwitter(accessToken, accessSecret) {
        this.loginType = 'Login with Twitter';
        const credential = firebase.auth.TwitterAuthProvider
            .credential(accessToken, accessSecret);
        return this.fireAuth.auth.signInWithCredential(credential);
    }
    public twitterLogin(): Promise<any> {
        this.loginType = 'Login with Twitter';
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
    public loginWithGoogle(accessToken, accessSecret) {
        this.loginType = 'Login with Google'
        const credential = accessSecret ? firebase.auth.GoogleAuthProvider
            .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
                .credential(accessToken);
        return this.fireAuth.auth.signInWithCredential(credential);
    }
    public googleLogin(): Promise<any> {
        this.loginType = 'Login with Google';
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    public createSocialLoginUser(user): Promise<any> {
        this.authInfo$.next(new AuthInfo(user.uid, user));
        return;
    }

    public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
        return new Promise<any>((resolve, reject) => {

            firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    // window.confirmationResult = confirmationResult;
                    this.loginType = 'Login with Phone Number';
                    this.confirmationResult = confirmationResult;
                    resolve();
                }).catch(function (error) {
                    console.log(error);
                    reject('SMS not sent');

                    // Error; SMS not sent
                    // ...
                });
        })

    }
    public async enterVerificationCode(code) {
        return new Promise<any>((resolve, reject) => {
            this.confirmationResult.confirm(code).then(async (result) => {
                // User signed in successfully.
                const user = result.user;
                const credential = firebase.auth.PhoneAuthProvider.credential(this.confirmationResult.verificationId, code);

                await firebase.auth().signInWithCredential(credential);
                resolve(user);
                // ...
            }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                reject(error.message);
                // ...
            });

        })
    }



}
