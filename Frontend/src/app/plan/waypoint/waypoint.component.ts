import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../services/plan.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {HereMapService} from '../../services/here-map.service';
import {Coordinate} from '../../models/coordinate';
import {Waypoint} from '../../helpers/waypoint';
import {dateFormat} from '../../helpers/date-format';
import {MatSnackBar} from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.css']
})
export class WaypointComponent implements OnInit {
  waypointForm = this.formBuilder.group({
    waypoints: this.formBuilder.array([])
  });
  planId;
  chosenWaypoints: Array<Waypoint> = [];
  currentCoordinate = new Coordinate('21.028511', '105.804817');
  suggestLocations;
  isSearching = false;

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private hereMapService: HereMapService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.getCurrentLocation();
    this.planService.waypointsListener.subscribe(res => {
      this.waypoints.clear();
      this.chosenWaypoints = res;
      this.chosenWaypoints.sort((a, b) => a.order > b.order ? 1 : -1);
      for (const waypoint of this.chosenWaypoints) {
        this.addWaypoint(waypoint);
      }
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentCoordinate.latitude = position.coords.latitude.toString();
        this.currentCoordinate.longitude = position.coords.longitude.toString();
      });
    }
  }

  get waypoints() {
    return this.waypointForm.get('waypoints') as FormArray;
  }

  createWaypoint(waypoint?: Waypoint) {
    const formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      arrival_at: ['', [Validators.required]],
      leave_at: ['', [Validators.required]],
      order: ['', [Validators.required]]
    });
    if (waypoint) {
      formGroup.patchValue({
        name: waypoint.name,
        activity: waypoint.activity,
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
        arrival_at: waypoint.arrival_at,
        leave_at: waypoint.leave_at,
        order: waypoint.order
      });
    }
    formGroup.get('name').valueChanges
      .pipe(
        filter(val => val.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isSearching = true),
        switchMap(input => this.hereMapService.getDiscover(input, this.currentCoordinate)
          .pipe(
            // @ts-ignore
            filter(item => item.resultType !== 'categoryQuery'),
            finalize(() => this.isSearching = false)
          ))
      ).subscribe(res => {
        // @ts-ignore
        this.suggestLocations = res.items;
    });
    return formGroup;
  }

  onChooseWaypoint(i: number, waypoint: any) {
    this.waypoints.at(i).patchValue({
      latitude: waypoint.position.lat,
      longitude: waypoint.position.lng,
      order: i
    });
    const waypointValue = this.waypoints.at(i).value;
    const newWaypoint = new Waypoint(
      waypoint.address.label, i,
      waypoint.position.lat,
      waypoint.position.lng,
      waypointValue.activity,
      waypointValue.arrival_at, waypointValue.leave_at);
    const existingIndex = this.chosenWaypoints.findIndex(item => item.order === i);
    if (existingIndex !== -1) {
      this.chosenWaypoints[existingIndex] = newWaypoint;
    } else {
      this.chosenWaypoints.push(newWaypoint);
    }
    this.planService.setWaypoints(this.chosenWaypoints);
  }

  addWaypoint(waypoint: Waypoint = null) {
    this.waypoints.push(this.createWaypoint(waypoint));
  }

  removeWaypoint(index: number) {
    if (this.waypoints.at(index).get('name').value) {
      for (const [i, item] of this.chosenWaypoints.entries()) {
        if (item.order > index) {
          item.order--;
          this.waypoints.at(i).patchValue({
            order: item.order
          });
        }
      }
      this.chosenWaypoints.splice(index, 1);
      this.planService.setWaypoints(this.chosenWaypoints);
    } else {
      this.waypoints.removeAt(index);
    }
  }

  onSubmit() {
    for (const waypoint of this.waypointForm.value.waypoints) {
      waypoint.leave_at = dateFormat(waypoint.leave_at);
      waypoint.arrival_at = dateFormat(waypoint.arrival_at);
    }
    this.planService.updateWaypoints(this.waypointForm.value, this.planId).subscribe(res => {
      this.snackBar.open('Route is updated :)', 'Close', {duration: 3000});
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    // console.log(this.chosenWaypoints, event);
    moveItemInArray(this.waypoints.controls, event.previousIndex, event.currentIndex);
    this.waypoints.at(event.currentIndex).patchValue({
      order: event.currentIndex
    });
    this.waypoints.at(event.previousIndex).patchValue({
      order: event.previousIndex
    });
    const temp = this.chosenWaypoints[event.previousIndex];
    this.chosenWaypoints[event.previousIndex] = this.chosenWaypoints[event.currentIndex];
    this.chosenWaypoints[event.currentIndex] = temp;
    this.chosenWaypoints[event.currentIndex].order = event.currentIndex;
    this.chosenWaypoints[event.previousIndex].order = event.previousIndex;
    // console.log(this.chosenWaypoints);
    this.planService.setWaypoints(this.chosenWaypoints);
  }

}
