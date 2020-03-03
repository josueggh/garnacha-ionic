import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    console.log(info);
  }

}
