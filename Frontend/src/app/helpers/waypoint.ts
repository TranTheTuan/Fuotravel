export class Waypoint {
  name: string;
  activity: string;
  // tslint:disable-next-line:variable-name
  arrival_at: string;
  // tslint:disable-next-line:variable-name
  leave_at: string;
  order: number;
  latitude: string;
  longitude: string;

  constructor(
    name: string,
    order: number,
    lat: string,
    lng: string,
    activity = 'khởi hành',
    arrival = '',
    leave = ''
  ) {
    this.name = name;
    this.order = order;
    this.latitude = lat;
    this.longitude = lng;
    this.activity = activity;
    this.arrival_at = arrival;
    this.leave_at = leave;
  }
}
