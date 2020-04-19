import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl} from '@angular/forms';
import {HereMapFunction} from '../../helpers/map-functions';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

declare let H: any;
@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit, AfterViewInit {
  private hereMapFunction: HereMapFunction;
  @ViewChild('hereMap')
  private hereRef: ElementRef;
  private platform;
  private map;
  private ui;
  private searchService;
  private routingService;
  currentLat = 37.532600;
  currentLng = 127.024612;
  searchControl = new FormControl();
  routingParams = {
    mode: 'fastest;car',
    waypoint0: 'geo!21.028511,105.804817',
    waypoint1: 'geo!20.53333,105.96667',
    representation: 'display'
  };
  constructor() { }

  ngOnInit(): void {
    this.platform = new H.service.Platform({
      apikey: environment.apiMap
    });
    this.searchService = this.platform.getSearchService();
    this.routingService = this.platform.getRoutingService();
    this.getRoute();
  }
  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.hereRef.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: {lat: this.currentLat, lng: this.currentLng}
      }
    );
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = new H.ui.UI.createDefault(this.map, defaultLayers);
    this.hereMapFunction = new HereMapFunction(this.map, behavior, this.ui);
  }
  getRoute() {
    this.routingService.calculateRoute(this.routingParams, this.onResult, error => {
      alert(error.message);
    });
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const label = 'your location';
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
        this.map.setCenter({lat: this.currentLat, lng: this.currentLng});
        this.map.setZoom(14);
        const marker = this.hereMapFunction.createMarker(this.currentLat, this.currentLng, label);
        this.map.addObject(marker);
      });
    }
  }
  search() {
    const searchValue = this.searchControl.value;
    console.log(searchValue);
    this.searchService.geocode({
      q: searchValue
    }, (result) => {
      console.log(result);
      result.items.forEach(item => {
        const marker = this.hereMapFunction.createMarker(item.position.lat, item.position.lng, item.address.label);
        this.map.setCenter(item.position);
        this.map.setZoom(14);
        this.map.removeObjects(this.map.getObjects());
        this.map.addObject(marker);
      });
    }, alert);
  }
  private onResult = (result) => {
    let route;
    let routeShape;
    let startpoint;
    let endpoint;
    let lineString;
    console.log(result);
    if (result.response.route) {
      route = result.response.route[0];
      routeShape = route.shape;
      lineString = new H.geo.LineString();
      routeShape.forEach(point => {
        const parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
      });
      startpoint = route.waypoint[0].mappedPosition;
      endpoint = route.waypoint[1].mappedPosition;
      const routeOutline = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 10,
          strokeColor: 'rgba(0, 128, 255, 0.7)',
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head'
        }
      });
      const routeArrows = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 10,
          fillColor: 'white',
          strokeColor: 'rgba(255, 255, 255, 1)',
          lineDash: [0, 2],
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head'
        }
      });
      const routeLine = new H.map.Group();
      routeLine.addObjects([routeOutline, routeArrows]);
      const startMarker = this.hereMapFunction.createMarker(startpoint.latitude, startpoint.longitude, route.waypoint[0].label);
      const endMarker = this.hereMapFunction.createMarker(endpoint.latitude, endpoint.longitude,  route.waypoint[1].label);
      this.map.addObjects([routeLine, startMarker, endMarker]);
      this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    }
  }

}
