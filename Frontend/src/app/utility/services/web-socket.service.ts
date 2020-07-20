import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri: string = environment.webSocketUrl;

  constructor(
    private authService: AuthService
  ) {
    this.socket = io.connect(this.uri);
  }

  listen(eventName: string) {
    return new Observable<any>(subscriber => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
