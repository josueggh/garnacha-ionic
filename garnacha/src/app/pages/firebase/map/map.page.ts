import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  center;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.platform.ready().then( ()=>{
      this.geolocation.getCurrentPosition().then( locationResponse => {
        this.center  = {
          lat : locationResponse.coords.latitude,
          lng: locationResponse.coords.longitude
        };
        console.log(this.center);
      })
    });
  }


  async onSelect(info) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'info': info,
        'current': this
      }
    });
    return await modal.present();
  }

}
