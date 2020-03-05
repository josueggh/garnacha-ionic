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
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: './pages/walkthrough/walkthrough.module#WalkthroughPageModule'},
  //{ path: 'home', loadChildren: './pages/firebase/firebase-home/home.module#HomePageModule' , canActivate: [GuardsService] },
  //{ path: 'login', loadChildren: './pages/firebase/login/login.module#LoginPageModule' },
  //{ path: 'ad-mob', loadChildren: './ad-mob/ad-mob.module#AdMobPageModule' , canActivate: [GuardsService]},
 // { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule'},
  //{ path: 'images', loadChildren: './pages/firebase/image-upload/image-upload.module#ImageUploadPageModule' , canActivate: [GuardsService] },
  //{ path: 'crash-lytics', loadChildren: './crash-lytics/crash-lytics.module#CrashLyticsPageModule' },
  //{ path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsPageModule' },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'map', loadChildren: './pages/firebase/map/map.module#MapPageModule' },
  { path: 'business-detail', loadChildren: './pages/firebase/business-detail/business-detail.module#BusinessDetailPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
