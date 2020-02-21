import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from './services';
import {Router} from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fuotravel';
  data;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
  ngOnInit(): void {
    // this.subscribe();
  }
  // private subscribe() {
  //   const socket = io('http://localhost:3000');
  //   const echo = new Echo({
  //     broadcaster: 'socket.io',
  //     host: environment.socket
  //   });
  //   echo.connector.socket.on('connect', () => {
  //     console.log('connected', echo.socketId());
  //   });
  //   echo.connector.socket.on('dashboard:App\\Events\\BroadcastingDemo', (data) => {
  //     console.log(data);
  //   });
  // }
}
