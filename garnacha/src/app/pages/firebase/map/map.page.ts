import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  center = {
    lat: 0,
    lng: 0,
  };

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
  }

  async onSelect(info) {
    console.log(info);
  }

}
