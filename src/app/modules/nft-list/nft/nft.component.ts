import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Wantlist} from '@workspace/wantlist/models/Wantlist';
import {WantlistService} from '@workspace/wantlist/services/wantlist.service';
import {User} from '@workspace/user/models/User';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input('nft') nft: any;
  @Input('wantlist') wantlist: Wantlist[];
  @Input('user') user: User;

  constructor(
    private wantlistService: WantlistService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  addNftToWantlist(selectedNft: any): void {
    const payload = {
      user: {
        id: this.user._id
      },
      token: {
        id: selectedNft.id.tokenId
      }
    }
    this.wantlistService.addNftToWantlist(payload).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((wantlist) => {
      if (wantlist) {
        selectedNft.wanted = wantlist._id;
        this.cd.markForCheck();
      }
    });
  }

  removeNftToWantlist(selectedNft: any): void {
    this.wantlistService.removeNftToWantlist(this.user._id, selectedNft.wanted).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
        selectedNft.wanted = false;
        this.cd.markForCheck();
    });
  }
}
