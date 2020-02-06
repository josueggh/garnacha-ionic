/**
* Ionic 4 Firebase Full App  (https://store.enappd.com/product/ionic-4-firebase-full-app-starter)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/ 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsService } from './guards/guards.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/firebase/firebase-home/home.module#HomePageModule' , canActivate: [GuardsService] },
  { path: 'signup', loadChildren: './pages/firebase/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/firebase/login/login.module#LoginPageModule' },
  { path: 'ad-mob', loadChildren: './ad-mob/ad-mob.module#AdMobPageModule' , canActivate: [GuardsService]},
  { path: 'images', loadChildren: './pages/firebase/image-upload/image-upload.module#ImageUploadPageModule' , canActivate: [GuardsService] },
  { path: 'crash-lytics', loadChildren: './crash-lytics/crash-lytics.module#CrashLyticsPageModule' },
  { path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
