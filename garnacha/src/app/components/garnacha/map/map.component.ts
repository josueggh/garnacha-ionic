import { Component, OnInit, AfterViewInit, ViewChild, Input, Renderer2, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ListService } from '../../../services/data-services/list.service';
import { makeRe } from 'minimatch';
import { EventEmitter } from '@angular/core';
import { List } from '../../../models/list.model'

declare var google;

@Component({
  selector: 'garnacha-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElementRef;
  @Input() center;
  @Output() selection = new EventEmitter();

  markers;
  map;
  googleMaps;
  mainMaker;
  currentMaker;
  currentWindow;

  constructor(
    private renderer: Renderer2,
    private listService: ListService
     ) { }

  ngOnInit() {}

  getMarkers(center){
    const list: List = { 
      active: true,
      type: 'bylocation',
      icon: 'globe',
      name : 'Near you',
      id: 'bylocation',
      lat: center.lat,
      lng: center.lng
    };
    //console.log(list);
    return this.listService.getDetails(list);
  }
  /*getMarkers(center) {
    const list = {
      type: 'bylocation',
      lat: center.lat,
      lng: center.lng,
    };
    return this.listService.getDetails(list);
  }*/

  getRandomPhoto(business, size = 200, random = false) {
    let img = 'https://www.garnacha.mx/static/img/GRN-generico.jpg';
    if (business.photos && business.photos.length) {
      const index = random ? Math.floor(Math.random() * business.photos.length) : 0;
      img = business.photos[index];
    }
    let quality = 60;
    const extensionArray = img.split('.');
    const extension = extensionArray[extensionArray.length - 1];

    if (extension.toLowerCase() === 'png') {
        quality = 20;
    }
    return `https://images.weserv.nl/?url=${img}&w=${size}&h=${size}&q=${quality}&fit=cover&a=attention`;
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {

        this.mainMaker = {
          url: '/assets/imgs/marker.png',
          size: new google.maps.Size(28, 28),
          scaledSize: new google.maps.Size(28, 28)
        };

        this.currentMaker = {
          url: '/assets/imgs/marker_current.png',
          size: new google.maps.Size(28, 28),
          scaledSize: new google.maps.Size(28, 28)
        };

        const renderMarkers = () => {
          this.markers.map( marker => {
            const googlemapsMarker = new googleMaps.Marker({
              position: {lat: marker.location.lat , lng: marker.location.lng},
              map: this.map,
              title: marker.name,
              info : marker,
              icon: marker.icon ? marker.icon : this.mainMaker
            });

            if (!marker.current){
              google.maps.event.addListener(googlemapsMarker, 'click', () => {
                this.selection.emit(googlemapsMarker.info);
              });
            }

          });
        }

        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        this.map = new googleMaps.Map(mapEl, {
          center: this.center,
          zoom: 15,
          minZoom: 14,
          maxZoom: 18,
          streetViewControl: false,
          mapTypeControl: false,
          styles: [{
            featureType: 'poi',
            stylers: [{ visibility: 'off'}]
            }
          ]
        });

        this.googleMaps.event.addListenerOnce(this.map, 'idle', async () => {
          if(!this.map){
            return false;
          }
          const currentLocation = {
            location: {
              lat: this.map.center.lat(),
              lng: this.map.center.lng(),
            },
            name : 'Current Location',
            icon: this.currentMaker,
            current: true
          };

          this.getMarkers(this.center).subscribe( markers => {
            this.markers = markers;
            this.markers.push(currentLocation);
            renderMarkers();
            this.renderer.addClass(mapEl, 'visible');
          });
          
        });

        this.googleMaps.event.addListener(this.map, 'dragend', async () => {
          const recenter = {
            lat: this.map.center.lat(),
            lng: this.map.center.lng()
          };
          this.getMarkers(recenter).subscribe( markers => {
            this.markers = markers;
            renderMarkers();
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }
}
