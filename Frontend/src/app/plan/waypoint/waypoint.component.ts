import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';
import {HereMapService} from '../../services/here-map.service';

@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.css']
})
export class WaypointComponent implements OnInit {
  waypointForm = this.formBuilder.group({
    waypoints: this.formBuilder.array([this.createWaypoint()])
  });
  planId;
  currentLat = 21.028511;
  currentLng = 105.804817;
  suggestLocations;
  isSearching = false;
  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private hereMapService: HereMapService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.getCurrentLocation();
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
      });
    }
  }
  get waypoints() {
    return this.waypointForm.get('waypoints') as FormArray;
  }
  createWaypoint() {
    const formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      arrival_at: [''],
      leave_at: [''],
      order: ['', [Validators.required]]
    });
    formGroup.get('name').valueChanges
      .pipe(
        filter(val => val.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        tap(dat => {
          console.log(dat);
        }),
        switchMap(data => this.hereMapService.getGeocode(data))
      ).subscribe(res => {
        console.log(res);
        this.suggestLocations = res.items;
        // formGroup.patchValue({
        //   // @ts-ignore
        //   name: res.items[0].title
        // });
      });
    return formGroup;
  }
  onChooseLocation(i: any, location: any) {
    this.waypoints.at(i).patchValue({
      latitude: location.position.lat,
      longitude: location.position.lng,
      order: i
    });
  }
  addWaypoint() {
    this.waypoints.push(this.createWaypoint());
  }
  removeWaypoint(i: any) {
    this.waypoints.removeAt(i);
  }
  onSubmit() {
    // console.log(this.waypointForm.value);
    this.planService.updateWaypoints(this.waypointForm.value, this.planId).subscribe(res => {
      console.log(res);
    });
  }

}
