import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GET_ABITURIENT, GET_STATUS} from './URLS';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  approve: boolean;
  userId: number;
  specialities: Object;
  sum: number;
  profileInfo: null | { firstName: null | string, lastName: null | string };
  email: string;

  constructor(public router: Router, private http: HttpClient) {}

  title = 'app';
  token = JSON.parse(localStorage.getItem('token'));

  logOut() {
    localStorage.removeItem('token');
    location.replace('/');
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  ngOnInit() {
    if (this.token) {
      this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true}).subscribe(data => {
        this.approve = data['profileApproved'];
        this.userId = data['id'];
        this.profileInfo = data['profileInfo'];
        this.email = data['email'];
        if (this.approve) {
          this.http.get(GET_STATUS + this.userId + '/status', {headers: this.addHeaders(), withCredentials: true}).subscribe(response => {
            this.specialities = response['specialities'];
            this.sum = response['sum'];
          });
        }
      });
    }
  }
}
