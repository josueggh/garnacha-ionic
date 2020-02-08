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
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: '../pages/firebase/profile/profile.module#ProfilePageModule',
            //loadChildren: '../ad-mob/ad-mob.module#AdMobPageModule',
            //canActivate: [GuardsService]
          },
          /*{
            path: 'friends',
            loadChildren: () => import('../user/friends/user-friends.module').then(m => m.UserFriendsPageModule)
          }*/
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
