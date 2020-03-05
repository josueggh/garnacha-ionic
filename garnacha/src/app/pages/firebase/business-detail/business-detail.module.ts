import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailPage } from './business-detail.page';
import { SharableModule } from '../../../components/sharable.module';

const routes: Routes = [
  {
    path: '',
    component: BusinessDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BusinessDetailPage]
})
export class BusinessDetailPageModule {}
