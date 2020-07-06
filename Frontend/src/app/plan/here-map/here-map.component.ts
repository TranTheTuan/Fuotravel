import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HereMapFunction} from '../../helpers/map-functions';
import {HereMapService} from '../../services/here-map.service';
import {Waypoint} from '../../helpers/waypoint';
import {ActivatedRoute} from '@angular/router';
import {PlanService} from '../../services/plan.service';
import {MemberService} from '../../services/member.service';
import {ADMIN, MODERATOR} from '../../helpers';

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
  currentLat = 21.028511;
  currentLng = 105.804817;
  waypoints: Waypoint[] = [];
  datasource: Waypoint[] = [];
  markers = [];
  planId;
  membership;
  _ADMIN = ADMIN;
  _MODERATOR = MODERATOR;
  displayedColumns = ['position', 'name', 'activity', 'from', 'to'];

  constructor(
    private planService: PlanService,
    private hereMapService: HereMapService,
    private memberService: MemberService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.platform = new H.service.Platform({
      apikey: environment.apiMapJS
    });
    this.searchService = this.platform.getSearchService();
    this.routingService = this.platform.getRoutingService();
    // this.getRoute();
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.planService.getWaypoints(this.planId);
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
  }

  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.hereRef.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 14,
        center: {lat: this.currentLat, lng: this.currentLng}
      }
    );
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = new H.ui.UI.createDefault(this.map, defaultLayers);
    this.hereMapFunction = new HereMapFunction(this.map, behavior, this.ui);
    this.planService.waypointsListener.subscribe(res => {
      this.waypoints = res;
      console.log(this.markers);
      this.onChoseWaypoint(this.waypoints);
    });
  }

  onChoseWaypoint(chosenWaypoints: Array<Waypoint>) {
    this.markers = [];
    this.map.removeObjects(this.map.getObjects());
    // chosenWaypoints.sort((a, b) => a.order > b.order ? 1 : -1);
    const waypointsLength = chosenWaypoints.length;
    if (waypointsLength > 1) {
      for (let i = 0; i < waypointsLength - 1; i++) {
        const routingParams = this.createRoutingParams(chosenWaypoints[i], chosenWaypoints[i + 1]);
        this.routingService.calculateRoute(routingParams, this.onResult, error => {
        });
      }
      const backRoutingParams = this.createRoutingParams(chosenWaypoints[waypointsLength - 1], chosenWaypoints[0]);
      this.routingService.calculateRoute(backRoutingParams, this.onResult, error => {
        console.log(error.message);
      });
    } else if (waypointsLength === 1) {
      const lat = chosenWaypoints[0].latitude;
      const lng = chosenWaypoints[0].longitude;
      const label = chosenWaypoints[0].name;
      const marker = this.hereMapFunction.createMarker(lat, lng, label);
      this.map.setCenter({lat, lng});
      this.map.setZoom(14);
      this.map.addObject(marker);
    }
  }

  onClickWaypoint(row) {
    this.markers[row.order].dispatchEvent('tap');
    console.log(row, this.markers[row.order].getGeometry());
  }

  createRoutingParams(waypoint0: Waypoint, waypoint1: Waypoint, represent = 'display', modeType = 'fastest', modeVehicle = 'car') {
    return {
      mode: modeType + ';' + modeVehicle,
      waypoint0: 'geo!' + waypoint0.latitude + ',' + waypoint0.longitude,
      waypoint1: 'geo!' + waypoint1.latitude + ',' + waypoint1.longitude,
      representation: represent
    };
  }

  private onResult = (result) => {
    let route;
    let routeShape;
    let startpoint;
    let endpoint;
    let lineString;
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
      const endMarker = this.hereMapFunction.createMarker(endpoint.latitude, endpoint.longitude, route.waypoint[1].label);
      this.map.addObjects([routeLine, startMarker, endMarker]);
      this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
      this.markers.push(startMarker);
    }
  }

}
