import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getTabs() {
    return of([
      {
        id: 1,
        title: 'Name',
        placeholder: 'Enter your name...',
        ref: 'name'
      },
      {
        id: 2,
        title: 'Email',
        placeholder: 'Enter your email...',
        ref: 'email'
      },
      {
        id: 3,
        title: 'Phone',
        placeholder: 'Enter your phone...',
        ref: 'phone'
      }
    ]);
  }
}
