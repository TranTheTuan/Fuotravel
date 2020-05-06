export class Waypoint {
  title: string;
  order: number;
  lat: string;
  lng: string;
  constructor(
    title: string,
    order: number,
    lat: string,
    lng: string
  ) {
    this.title = title;
    this.order = order;
    this.lat = lat;
    this.lng = lng;
  }
}
