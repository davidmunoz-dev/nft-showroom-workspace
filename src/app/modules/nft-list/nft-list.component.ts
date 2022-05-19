import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NftService} from '@workspace/nft/services/nft.service';
import {finalize, forkJoin, Subject, takeUntil, tap} from 'rxjs';
import {User} from '@workspace/user/models/User';
import {Router} from '@angular/router';
import {UserService} from '@workspace/user/services/user.service';
import {WantlistService} from '@workspace/wantlist/services/wantlist.service';
import {Wantlist} from '@workspace/wantlist/models/Wantlist';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class NftListComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  nfts: any;
  formattedNfts: any;
  user: User;
  wantlist: Wantlist[];
  loading: boolean;

  constructor(
    private nftService: NftService,
    private userService: UserService,
    private wantlistService: WantlistService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.router.navigate(['/auth/login']);
    }

    // @ts-ignore
    this.userService.getUserById(userId).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((user) => {
      if (user) {
        this.user = user;

        forkJoin({
          nfts: this.nftService.getNft('0xfae46f94ee7b2acb497cecaff6cff17f621c693d'),
          wantlist: this.wantlistService.getWantlist(this.user._id)
        }).pipe(
          takeUntil(this._unsubscribeAll),
          tap(({nfts, wantlist}) => {
            this.nfts = nfts;
            this.wantlist = wantlist;
          }),
          finalize(() => {
            this.formattedNfts = this.wantlistService.addWantedForNfts(this.nfts, this.wantlist);
            this.loading = false;
            this.cd.detectChanges();
          })
        ).subscribe();
      }
    }, error => {
      localStorage.removeItem('user_id')
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
