import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import { SharableModule } from '../../../components/sharable.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapPage
      }
    ])
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
