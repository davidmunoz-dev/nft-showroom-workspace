import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {User} from '@workspace/user/models/User';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUser(userName: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'user/name/' + userName);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'user/' + userId);
  }

  createUser(payload: any): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'user', payload);
  }

}
