import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from '@workspace/user/services/user.service';
import {User} from '@workspace/user/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user: User;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.router.navigate(['/nft-list']);
    }
    this.form = this.formBuilder.group({
      userName: [null, Validators.required]
    });
  }

  onSubmitUserName(): void {
    this.userService.getUser(this.form.get("userName")?.value).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user_id', this.user._id);
        this.router.navigate(['/nft-list']);
      }
      this.cd.markForCheck();
    }, error => {
      this.form.get('userName')?.setErrors(error.error.message);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }

}
