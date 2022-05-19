import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {map, Observable, ReplaySubject, tap} from 'rxjs';

@Injectable()
export class NftService {
  constructor(private http: HttpClient) {
  }

  getNft(ownerId: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'nfts/' + ownerId);
  }

}
