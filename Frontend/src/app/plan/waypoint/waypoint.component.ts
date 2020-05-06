import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {HereMapService} from '../../services/here-map.service';
import {Coordinate} from '../../models/coordinate';
import {Waypoint} from '../../helpers/waypoint';

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
  chosenWaypoints: Array<Waypoint> = [];
  @Output() choseWaypoint = new EventEmitter<Array<any>>();
  currentCoordinate = new Coordinate('21.028511', '105.804817');
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
        this.currentCoordinate.latitude = position.coords.latitude.toString();
        this.currentCoordinate.longitude = position.coords.longitude.toString();
        // this.currentLat = position.coords.latitude;
        // this.currentLng = position.coords.longitude;
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
        tap(() => this.isSearching = true),
        switchMap(input => this.hereMapService.getAutoSuggest(input, this.currentCoordinate)
          .pipe(
            finalize(() => this.isSearching = false)
          ))
      ).subscribe(res => {
        // @ts-ignore
        this.suggestLocations = res.items;
        console.log(this.suggestLocations);
      });
    return formGroup;
  }
  onChooseWaypoint(i: number, waypoint: any) {
    this.waypoints.at(i).patchValue({
      latitude: waypoint.position.lat,
      longitude: waypoint.position.lng,
      order: i
    });
    const newWaypoint = new Waypoint(
      waypoint.address.label, i,
      waypoint.position.lat,
      waypoint.position.lng);
    const existingIndex = this.chosenWaypoints.findIndex(item => item.order === i);
    if (existingIndex !== -1) {
      this.chosenWaypoints[existingIndex] = newWaypoint;
    } else {
      this.chosenWaypoints.push(newWaypoint);
    }
    this.choseWaypoint.emit(this.chosenWaypoints);
  }
  addWaypoint() {
    this.waypoints.push(this.createWaypoint());
  }
  removeWaypoint(i: number) {
    if (this.waypoints.at(i).get('name').value) {
      const wpIndex = this.chosenWaypoints.findIndex(item => item.order === i);
      this.chosenWaypoints.splice(wpIndex, 1);
      this.choseWaypoint.emit(this.chosenWaypoints);
    }
    this.waypoints.removeAt(i);
  }
  onSubmit() {
    // console.log(this.waypointForm.value);
    this.planService.updateWaypoints(this.waypointForm.value, this.planId).subscribe(res => {
      console.log(res);
    });
  }

}
