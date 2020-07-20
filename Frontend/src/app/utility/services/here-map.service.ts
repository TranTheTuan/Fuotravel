import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Coordinate} from '../models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class HereMapService {
  private APIS = {
    1: environment.apiURL + '/here-map/search/discover',
    2: environment.apiURL + '/here-map/search/geocode/{query}',
    3: environment.apiURL + '/here-map/search/revgeocode/{lat}/{lng}',
    4: environment.apiURL + '/here-map/search/auto-suggest',
  };

  constructor(
    private http: HttpClient
  ) {
  }

  getDiscover(query: string, coordinates: Coordinate, limit: any = 5, type: string = '') {
    return this.http.get(this.APIS[1], {
      params: new HttpParams()
        .set('lat', coordinates.latitude)
        .set('lng', coordinates.longitude)
        .set('query', query)
        .set('limit', limit)
    });
  }

  getGeocode(query: string) {
    const apiUrl = this.APIS[2].replace('{query}', query);
    return this.http.get(apiUrl);
  }

  getReverseGeocode(coordinates: Coordinate) {
    const apiUrl = this.APIS[3].replace('{lat}', coordinates.latitude)
      .replace('{lng}', coordinates.longitude);
    return this.http.get(apiUrl);
  }

  getAutoSuggest(query: string, coordinates: Coordinate, limit: any = 5, type: string = '') {
    // const apiUrl = this.APIS[4].replace('{lat}', coordinates.latitude)
    //   .replace('{lng}', coordinates.longitude)
    //   .replace('{query}', query)
    //   .replace('{limit}', limit);
    return this.http.get(this.APIS[4], {
      params: new HttpParams()
        .set('lat', coordinates.latitude)
        .set('lng', coordinates.longitude)
        .set('query', query)
        .set('limit', limit)
        .set('type', type)
    });
  }
}
