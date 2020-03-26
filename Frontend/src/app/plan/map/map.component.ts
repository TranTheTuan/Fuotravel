import { Component, OnInit } from '@angular/core';
import {tileLayer, latLng, marker} from 'leaflet';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  optionsConfig = {
    layers: [
      {
        url: 'https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?apiKey=',
        maxZoom: 18, attribution: '&copy; HERE 2020'
      }
    ],
    zoom: 13,
    center: [37.532600, 127.024612]
  };
  markerConfigs = {
    title: 'You are here',
    draggable: true,
    autoPan: true
  };
  options;
  center;
  layers = [];
  currentLat = 37.532600;
  currentLng = 127.024612;
  apiKey = environment.apiMap;
  constructor() { }

  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer(this.optionsConfig.layers[0].url + this.apiKey,
          { maxZoom: this.optionsConfig.layers[0].maxZoom,
            attribution: this.optionsConfig.layers[0].attribution
          })
      ],
      zoom: this.optionsConfig.zoom,
      center: latLng(this.currentLat, this.currentLng)
    };
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
        this.layers.push(marker([this.currentLat, this.currentLng], this.markerConfigs));
        this.center = latLng(this.currentLat, this.currentLng);
      });
    } else {
      console.log('cannot get location');
    }
  }
  onMapClick(event) {
    this.layers = [];
    this.layers.push(marker([event.latlng.lat, event.latlng.lng]));
  }

}
