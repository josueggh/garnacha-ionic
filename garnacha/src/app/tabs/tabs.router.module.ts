import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';
import { GuardsService } from '../guards/guards.service';
import { AuthenticationService } from '../services/firestore/firebase-authentication.service';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: '../pages/firebase/firebase-home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: '../pages/firebase/firebase-home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../pages/firebase/profile/profile.module#ProfilePageModule',
            canActivate: [GuardsService]
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
