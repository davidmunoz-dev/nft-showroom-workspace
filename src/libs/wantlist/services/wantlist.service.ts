import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {Wantlist} from '@workspace/wantlist/models/Wantlist';

@Injectable()
export class WantlistService {
  constructor(private http: HttpClient) {
  }

  getWantlist(userId: string): Observable<Array<Wantlist>> {
    return this.http.get<Array<Wantlist>>(environment.apiUrl + 'wantlist/' + userId);
  }

  addNftToWantlist(payload: any): Observable<Wantlist> {
    return this.http.post<Wantlist>(environment.apiUrl + 'add/wantlist', payload);
  }

  removeNftToWantlist(userId: string, wantlistId: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'wantlist/' + userId + '/' + wantlistId);
  }

  addWantedForNfts(nfts: any, wantlist: Wantlist[]): any {
    for (const wanted of wantlist) {
      const findIndex = nfts.ownedNfts.findIndex((nft: any) => nft.id.tokenId === wanted.tokenId);
      if (findIndex !== -1) {
        nfts.ownedNfts[findIndex].wanted = wanted._id;
      }
    }
    return nfts;
  }

  filterWantedNfts(nfts: any, wantlist: Wantlist[]): any {
    let wantedNfts = [];
    for (const wanted of wantlist) {
      const findIndex = nfts.ownedNfts.findIndex((nft: any) => nft.id.tokenId === wanted.tokenId);
      if (findIndex !== -1) {
        nfts.ownedNfts[findIndex].wanted = wanted._id;
        wantedNfts.push(nfts.ownedNfts[findIndex]);
      }
    }
    return wantedNfts;
  }

}
